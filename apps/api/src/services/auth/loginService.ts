import * as argon2 from "argon2";

import { randomUUID, createHash } from "node:crypto";

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

  const sessionToken: string = randomUUID();
  const sessionHash: string = createHash("sha256")
    .update(sessionToken)
    .digest("hex");

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await db.orm.public.Session.create({
    userId: userExists.id,
    sessionHash: sessionHash,
    expiresAt: expiresAt,
  });

  return {
    error: false,
    message: "Authenticated.",
    session: sessionToken,
  };
}
