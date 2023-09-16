import pg, { ConnectionConfig } from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const config: ConnectionConfig = {
	connectionString: process.env.DATABASE_URL,
};

if (process.env.NODE_ENV === "production") config.ssl = true;

export const db = new Pool(config);
