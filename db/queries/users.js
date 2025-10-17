import bcrypt from "bcrypt";
import db from "#db/client";

export async function getUserById(id) {
  const sql = `SELECT id, phone, password FROM users WHERE id = $1`;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}
