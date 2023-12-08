import { compare } from "bcrypt-ts";
import * as jose from "jose";
import { db } from "~/db";

type LoginBody = {
  email: string;
  password: string;
};

export default defineEventHandler(async (event) => {
  const reqBody: LoginBody = await readBody(event);

  const data = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.email, reqBody.email),
  });

  if (data === undefined) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid email or password",
    });
  }

  const checkPassword = await compare(reqBody.password, data.password);

  if (!checkPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid email or password",
    });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const alg = "HS256";

  const jwt = await new jose.SignJWT({
    user: data.email,
  })
    .setProtectedHeader({ alg })
    // .setExpirationTime("240h")
    .sign(secret);

  setCookie(event, "tkn", jwt, {
    httpOnly: true,
    // maxAge: 10 * 365 * 24 * 60 * 60,
  });
  return "success";
});
