import type { FastifyRequest, FastifyReply } from "fastify";

import loginService from "../../services/auth/loginService.js";

import type { LoginType } from "../../schemas/loginSchema.js";

async function loginController(
  req: FastifyRequest<{ Body: LoginType }>,
  res: FastifyReply,
) {
  const response = await loginService(req.body);

  if (response.error) {
    return res.status(401).send(response.message);
  }

  res.setCookie("session", response.session!, {
    sameSite: "lax",
    httpOnly: true,
    path: "/",
    expires: response.sessionExpiresAt,
  });

  return res.status(200).send(response.message);
}

export default loginController;
