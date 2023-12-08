// import dayjs from "dayjs";
import dayjs from "dayjs";
import { db } from "~/db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let { start, end } = query;

  if (!start || !end) {
    start = new Date().toISOString().slice(0, 10);
    end = start;
  }

  let responseData;

  const endPlusOne = dayjs(end as string)
    .add(1, "day")
    .format("YYYY-MM-DD");

  console.log(start, end, endPlusOne);
  try {
    const data = await db.query.radonGwl.findMany({
      where: (radonGwl, { and, gte, lt }) =>
        and(
          gte(radonGwl.createdAt, new Date(start as string)),
          lt(radonGwl.createdAt, new Date(endPlusOne as string)),
        ),
      orderBy: (data, { asc }) => asc(data.createdAt),
    });

    // if (variable === "radon") {
    //   responseData = data.map((item) => {
    //     return {
    //       x: item.createdAt,
    //       y: item.radon_concentration,
    //     };
    //   });
    //   // console.log(responseData);
    // } else if (variable === "gwl") {
    //   responseData = data.map((item) => {
    //     return {
    //       x: item.createdAt,
    //       y: item.ground_water_level,
    //     };
    //   });
    // }

    // const radonData = data.map((item) => {
    //   return {
    //     x: item.createdAt,
    //     y: item.radon_concentration,
    //   };
    // });
    // const gwlData = data.map((item) => {
    //   return {
    //     x: item.createdAt,
    //     y: item.ground_water_level,
    //   };
    // });

    responseData = data.map((item) => {
      return {
        id: item.id,
        radon_concentration: item.radon_concentration,
        ground_water_level: item.ground_water_level,
        timestamp: item.createdAt,
      };
    });

    return responseData;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
