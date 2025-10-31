import bcrypt from "bcrypt";
import db from "#db/client";

// Create a new user with hashed password
export async function createUser(phone, password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const sql = `
  INSERT INTO users
    (phone, password)
  VALUES
    ($1, $2)
  RETURNING id, phone
  `;
  const {
    rows: [user],
  } = await db.query(sql, [phone, hashedPassword]);
  return user;
}

//Get user by id
export async function getUserById(id) {
  const sql = `SELECT id, phone, password FROM users WHERE id = $1`;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}

//Get user by phone
export async function getUserByPhone(id) {
  const sql = `SELECT id, phone, password FROM users WHERE phone = $1`;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}

//Get user by phone and password
export async function getUserByPhoneAndPassword(phone, password) {
  const sql = `SELECT id, phone, password FROM users WHERE phone = $1`;
  const {
    rows: [user],
  } = await db.query(sql, [phone]);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
}

//Delete user by id
export async function deleteUserById(id) {
  const sql = `DELETE FROM users WHERE id = $1 RETURNING id, phone`;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}
