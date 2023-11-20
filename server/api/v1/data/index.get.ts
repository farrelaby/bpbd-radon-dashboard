// import dayjs from "dayjs";
import { asc, desc } from "drizzle-orm";
import { db } from "~/db";
import { radonGwl } from "~/db/schema";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { variable } = query;

  if (!variable) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
    });
  }

  let responseData;

  // const end = dayjs(start as string)
  //   .add(1, "day")
  //   .format("YYYY-MM-DD");

  try {
    const sq = db
      .select()
      .from(radonGwl)
      .orderBy(desc(radonGwl.createdAt))
      .limit(20)
      .as("sq");

    const data = await db.select().from(sq).orderBy(asc(sq.createdAt));

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
