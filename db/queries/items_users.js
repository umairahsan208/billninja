import db from "#db/client";

// Create UserItem
export async function createUserItem(userId, itemId) {
  const sql = `
  INSERT INTO users_items
    (user_id, item_id)
  VALUES
    ($1, $2)
  RETURNING id, user_id, item_id
  `;
  const {
    rows: [itemUser],
  } = await db.query(sql, [userId, itemId]);
  return itemUser;
}

export async function payUserItem(userId, itemId) {
  const sql = `
    UPDATE users_items
    SET paid = TRUE
    WHERE user_id = $1 AND item_id = $2
    RETURNING id, user_id, item_id, paid
  `;
  const {
    rows: [updated],
  } = await db.query(sql, [userId, itemId]);
  return updated;
}
