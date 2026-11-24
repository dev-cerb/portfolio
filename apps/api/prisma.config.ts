import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { definePrismaConfig } from "@prisma/cli-engine";
import { defineConfig as ormConfig } from "@prisma/orm-postgres/config";

dotenvExpand.expand(dotenv.config({ path: "../../.env" }));

export default definePrismaConfig({
  orm: ormConfig({
    contract: "./src/prisma/contract.prisma",
    db: {
      connection: process.env["DATABASE_URL"]!,
    },
  }),
});
