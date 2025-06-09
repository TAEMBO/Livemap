import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";

export * from "./schema";

export const db = drizzle(postgres(process.env.DB_URI), { schema });
