export default defineEventHandler(async (event) => {
  const reqBody = await readBody(event);

  return reqBody;
});
