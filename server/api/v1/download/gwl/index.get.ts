import { AsyncParser } from "@json2csv/node";
import dayjs from "dayjs";
import { db } from "~/db";

const parser = new AsyncParser({
  fields: ["id", "ground_water_level", "createdAt", "updatedAt"],
});

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { start, end } = query;

  const endPlusOne = dayjs(end as string)
    .add(1, "day")
    .format("YYYY-MM-DD");

  const data = await db.query.radonGwl.findMany({
    where: (radonGwl, { and, gte, lte }) =>
      and(
        gte(radonGwl.createdAt, new Date(start as string)),
        lte(radonGwl.createdAt, new Date(endPlusOne as string)),
      ),
    orderBy: (data, { asc }) => asc(data.createdAt),
    columns: {
      radon_concentration: false,
    },
  });

  const csv = await parser.parse(data).promise();
  setResponseHeader(event, "Content-Type", "text/csv");
  return csv;

  //   return data;
});
