import pg from "pg";

console.log("🔍 DATABASE_URL:", process.env.DATABASE_URL);

const db = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
export default db;
