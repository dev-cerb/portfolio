import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import postgres from "@prisma/orm-postgres/runtime";
import { contractFromJson } from "@prisma/orm-postgres/static";
import type { Contract } from "./contract.d.js";
import contractJson from "./contract.json" with { type: "json" };

dotenvExpand.expand(dotenv.config({ path: "../../.env" }));

export const contract = contractFromJson<Contract>(contractJson);

export const db = postgres({
  contract,
  url: process.env["DATABASE_URL"]!,
});
