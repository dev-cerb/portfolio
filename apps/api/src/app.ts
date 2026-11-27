import Fastify from "fastify";

import cookie from "@fastify/cookie";

import routes from "./routes/index.js";

const app = Fastify({
  logger: true,
});

app.register(cookie);

app.register(routes);

export default app;
