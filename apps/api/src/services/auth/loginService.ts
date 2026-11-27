import * as argon2 from "argon2";

import { randomUUID } from "node:crypto";

import { LoginType } from "../../schemas/loginSchema.js";
import { db } from "../../prisma/db.js";

async function loginService(data: LoginType) {
  const userExists = await db.orm.public.User.whereUnique({
    email: data.email,
  }).first();

  if (
    !userExists ||
    !(await argon2.verify(userExists.passwordHash, data.password))
  ) {
    return {
      error: true,
      message: "Invalid email or password.",
    };
  }

  const session: string = randomUUID();

  return {
    error: false,
    message: "Authenticated.",
    session: session,
  };
}
