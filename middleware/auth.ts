import * as jose from "jose";

type PayloadType = {
  user: string;
};

export default defineNuxtRouteMiddleware(async () => {
  if (process.client) return;

  const token = useCookie("tkn", {
    httpOnly: true,
  });

  if (token.value === undefined || token.value === null) {
    return navigateTo("/login");
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    const { payload }: { payload: PayloadType } = await jose.jwtVerify(
      token.value,
      secret,
    );

    await $fetch("/api/v1/auth/check", {
      method: "POST",
      body: {
        email: payload.user,
      },
    });
  } catch (error) {
    return navigateTo("/login");
  }
  // console.log(payload.user);
});
