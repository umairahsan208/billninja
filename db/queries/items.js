import db from "#db/client";

// items table queries
// getItems
// getItemsByGroupId
// getItemById
// createItems
// deleteItem


// Get all items
export async function getItems() {
  const sql = `SELECT id, name, cost, group_id, payer_user_id FROM items`;
  const { rows: items } = await db.query(sql);
  return items;
}

// Get items by group id
export async function getItemsByGroupId(groupId) {
  const sql = `SELECT id, name, cost, group_id, payer_user_id FROM items WHERE bill_id = $1`;
  const { rows: items } = await db.query(sql, [groupId]);
  return items;
}

// Get item by id
export async function getItemById(id) {
  const sql = `SELECT id, name, cost, group_id, payer_user_id FROM items WHERE id = $1`;
  const {
    rows: [item],
  } = await db.query(sql, [id]);
  return item;
}

// Create item
export async function createItem(name, cost, groupId, payerUserId) {
  const sql = `
  INSERT INTO items
    (name, cost, group_id, payer_user_id)
  VALUES
    ($1, $2, $3, $4)
  RETURNING id, name, cost, group_id, payer_user_id
  `;
  const {
    rows: [item],
  } = await db.query(sql, [name, cost, groupId, payerUserId]);
  return item;
}

// Delete item
export async function deleteItem(id) {
  const sql = `DELETE FROM items WHERE id = $1 RETURNING id, name, cost, group_id, payer_user_id`;
  const {
    rows: [item],
  } = await db.query(sql, [id]);
  return item;
}
