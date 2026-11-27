import type { FastifyRequest, FastifyReply } from "fastify";

async function loginController(req: FastifyRequest, res: FastifyReply) {
  return {
    message: "Ok",
  };
}

export default loginController;
