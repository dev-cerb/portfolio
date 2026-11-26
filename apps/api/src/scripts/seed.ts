import { db } from "../prisma/db.js";
import * as argon2 from "argon2";

const password = process.env.ADMIN_PASSWORD;
const email = process.env.ADMIN_EMAIL;

if (!password) {
  throw new Error("Obrigatório configurar ADMIN_PASSWORD");
}

if (!email) {
  throw new Error("Obrigatório configurar ADMIN_EMAIL");
}

try {
  await db.connect();
  await createSuperUser(email, password);
} finally {
  await db.close();
}

async function createSuperUser(email: string, password: string) {
  const emailExists = await db.orm.public.User.where({
    email: email,
  }).first();

  if (emailExists) {
    return console.log("Email já cadastrado.");
  }

  const hashPass = await argon2.hash(password);
  await db.orm.public.User.create({
    email: email,
    passwordHash: hashPass,
  });
  console.log("Usuário criado.");
}
