import dayjs from "dayjs";
import { db } from "~/db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { start, variable } = query;

  if (!start || !variable) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
    });
  }

  let responseData;

  const end = dayjs(start as string)
    .add(1, "day")
    .format("YYYY-MM-DD");

  try {
    const data = await db.query.radonGwl.findMany({
      where: (radonGwl, { and, gte, lt }) =>
        and(
          gte(radonGwl.createdAt, new Date(start as string)),
          lt(radonGwl.createdAt, new Date(end)),
        ),
    });

    if (variable === "radon") {
      responseData = data.map((item) => {
        return {
          x: item.createdAt,
          y: item.radon_concentration,
        };
      });
      // console.log(responseData);
    } else if (variable === "gwl") {
      responseData = data.map((item) => {
        return {
          x: item.createdAt,
          y: item.ground_water_level,
        };
      });
    }

    return responseData;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
