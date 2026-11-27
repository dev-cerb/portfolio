import type { FastifyInstance } from "fastify";
import authRoutes from "./auth/authRoutes.js";

async function routes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: "/auth" });

  app.get("/health", async () => {
    return {
      status: "ok",
    };
  });
}

export default routes;
