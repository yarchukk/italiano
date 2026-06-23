import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.DATABASE_URL;
const sqlHost = process.env.SQL_HOST;
const sqlDbName = process.env.SQL_DB_NAME;
const user = process.env.SQL_ADMIN_USER;
const password = process.env.SQL_ADMIN_PASSWORD;

if (!dbUrl && !sqlHost) throw new Error("Either DATABASE_URL or SQL_HOST must be set in environment variables.");

console.log(`Using ${dbUrl ? 'DATABASE_URL' : user} to connect to database.`);

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  schemaFilter: ["public"],
  dbCredentials: dbUrl ? { url: dbUrl } : {
    host: sqlHost!,
    user: user!,
    password: password!,
    database: sqlDbName!,
    ssl: false,
  },
  verbose: true,
});
