import { db } from "~/db";

export default defineEventHandler(async (event) => {
  const reqBody = await readBody(event);

  const findUser = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.email, reqBody.email),
  });

  // console.log(findUser);
  if (findUser === undefined) {
    throw createError({
      statusCode: 400,
      statusMessage: "email does not exist",
    });
  }

  return "ok";
});
