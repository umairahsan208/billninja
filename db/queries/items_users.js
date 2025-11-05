import db from "#db/client";

// Create UserItem
export async function createUserItem(userId, itemId, paid) {
  const sql = `
  INSERT INTO items_users
    (user_id, item_id, paid)
  VALUES
    ($1, $2)
  RETURNING id, user_id, item_id
  `;
  const {
    rows: [itemUser],
  } = await db.query(sql, [userId, itemId]);
  return itemUser;
}
