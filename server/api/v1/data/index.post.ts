import { db } from "~/db";
import { radonGwl } from "~/db/schema";

export default defineEventHandler(async (event) => {
  const reqBody = await readBody(event);
  let body;

  if (typeof reqBody === "string") {
    body = JSON.parse(reqBody);
  } else if (typeof reqBody === "object") {
    body = reqBody;
  }

  const newData = {
    radon_concentration: parseFloat(body.Radon),
    ground_water_level: parseFloat(body.GWL),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const headers = getRequestHeader(event, "authorization");
  if (!headers) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  // console.log(headers, headers.split(" ")[1]);

  const sensorAuthCode = Buffer.from(headers.split(" ")[1], "base64").toString(
    "ascii",
  );

  const sensorAccessKey = sensorAuthCode.split(":")[0];
  const sensorAccessToken = sensorAuthCode.split(":")[1];

  if (
    sensorAccessKey !== process.env.SENSOR_ACCESS_KEY ||
    sensorAccessToken !== process.env.SENSOR_ACCESS_TOKEN
  ) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  if (isNaN(newData.radon_concentration) && isNaN(newData.ground_water_level)) {
    throw createError({
      statusCode: 400,
      message: "Bad Request",
    });
  }
  await db.insert(radonGwl).values(newData);

  return "Success";
});
