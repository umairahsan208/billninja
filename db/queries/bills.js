import db from "#db/client";

// items table queries
// getBills
// getBillsByGroupId
// getBillById
// createBill
// deleteBill


// Get all bills
// export async function getBills() {
//   const sql = `SELECT id, name, total_cost, group_id FROM bills`;
//   const { rows: items } = await db.query(sql);
//   return bills;
// }

// Get bills by group id
// export async function getBillsByGroupId(billId) {
//   const sql = `SELECT id, name, total_cost, group_id FROM items WHERE bill_id = $1`;
//   const { rows: items } = await db.query(sql, [billId]);
//   return items;
// }

// Get bill by id
// export async function getBillById(id) {
//   const sql = `SELECT id, name, total_cost, group_id FROM items WHERE id = $1`;
//   const {
//     rows: [item],
//   } = await db.query(sql, [id]);
//   return item;
// }

// Create bill
// export async function createBill(name, totalcost, groupId) {
//   const sql = `
//   INSERT INTO items
//     (name, total_cost, group_id)
//   VALUES
//     ($1, $2, $3)
//   RETURNING id, name, total_cost, group_id
//   `;
//   const {
//     rows: [item],
//   } = await db.query(sql, [name, cost, billId, payerUserId]);
//   return item;
// }

// Delete bill
// export async function deleteBill(id) {
//   const sql = `DELETE FROM bills WHERE id = $1 RETURNING id, name, total_cost, group_id`;
//   const {
//     rows: [item],
//   } = await db.query(sql, [id]);
//   return item;
// }
