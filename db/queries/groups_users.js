import db from "#db/client";

// Create a new group user
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

// Get all group users for a user
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

export async function createGroupUser(groupId, userId) {
  const sql = `
    INSERT INTO groups_users (group_id, user_id)
    VALUES ($1, $2)
    RETURNING id, group_id, user_id
  `;
  const {
    rows: [groupUser],
  } = await db.query(sql, [groupId, userId]);
  return groupUser;
}

export async function getGroupUserByUserId(groupId) {
  const sql = `
    SELECT users.id, users.phone, users.first_name, users.last_name
    FROM users
    JOIN groups_users ON users.id = groups_users.user_id
    WHERE groups_users.group_id = $1
  `;
  const { rows: members } = await db.query(sql, [groupId]);
  return members;
}
