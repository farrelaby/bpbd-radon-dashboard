import { AsyncParser } from "@json2csv/node";
import { RadonGwl } from "~/db/models/radon_gwl";

const parser = new AsyncParser({});

export default defineEventHandler(async (event) => {
  const data = await RadonGwl.findAll({
    raw: true,
  });

  const csv = await parser.parse(data).promise();
  setResponseHeader(event, "Content-Type", "text/csv");
  return csv;
});
