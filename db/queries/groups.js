import bcrypt from "bcrypt";
import db from "#db/client";

// Create a new group and add user as member
export async function createGroupAndAddAsUser(name, userId) {
  const insertGroup = `
  INSERT INTO groups (name)
  VALUES ($1)                    
  RETURNING id, name, created_at
  `;
  const {
    rows: [group],
  } = await db.query(insertGroup, [name]);

  const insertUser = `
  INSERT INTO groups_users (group_id, user_id)
  VALUES ($1, $2)
  RETURNING id, group_id, user_id
  `;
  const {
    rows: [user],
  } = await db.query(insertUser, [group.id, userId]);

  return group;
}

// get all groups
export async function getGroups() {
  const sql = `SELECT id, name, created_at FROM groups`;
  const { rows: groups } = await db.query(sql);
  return groups;
}

// Get group members by group id
export async function getGroupById(id) {
  const sql = `SELECT id, name, created_at FROM groups WHERE id = $1`;
  const {
    rows: [group],
  } = await db.query(sql, [id]);
  return group;
}

// Delete group by id
export async function deleteGroup(id) {
  const sql = `DELETE FROM groups WHERE id = $1 RETURNING id, name, created_at`;
  const {
    rows: [group],
  } = await db.query(sql, [id]);
  return group;
}

// Get all groups for a user
export async function getGroupsByUserId(userId) {
  const sql = `
  SELECT groups.id, groups.name, groups.created_at
  FROM groups
  JOIN groups_users ON groups.id = groups_users.group_id
  WHERE groups_users.user_id = $1
  `;
  const { rows: groups } = await db.query(sql, [userId]);
  return groups;
}
