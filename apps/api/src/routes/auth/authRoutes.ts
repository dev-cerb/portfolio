import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from "fastify";

import { loginSchema, LoginType } from "../../schemas/loginSchema.js";

import loginController from "../../controllers/auth/loginController.js";

async function authRoutes(app: FastifyInstance) {
  app.post<{ Body: LoginType }>(
    "/login",
    {
      preValidation: (
        req: FastifyRequest,
        res: FastifyReply,
        done: HookHandlerDoneFunction,
      ) => {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
          res.status(400).send(result.error.message);
          return;
        }

        done();
      },
    },
    loginController,
  );
}

export default authRoutes;
