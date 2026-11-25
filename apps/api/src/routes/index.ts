import type { FastifyInstance } from "fastify";

async function routes(app: FastifyInstance) {
  app.get("/health", async () => {
    return {
      status: "ok",
    };
  });
}

export default routes;
