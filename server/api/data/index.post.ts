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

  //   const headers = getRequestHeader(event, "authorization");
  //   console.log(headers);
  // const data = await RadonGwl.findAll({
  //   raw: true,
  // });

  if (isNaN(newData.radon_concentration) && isNaN(newData.ground_water_level)) {
    throw createError({
      statusCode: 400,
      message: "Bad Request",
    });
  }
  await db.insert(radonGwl).values(newData);

  return "Success";
});
