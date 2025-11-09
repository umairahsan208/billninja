import db from "#db/client";

// Add a friend for a user
export async function createFriend(userId, friendId) {
  const sql = `
  INSERT INTO friends (user_id, friend_id)
  VALUES ($1, $2)
  RETURNING id, user_id, friend_id
  `;
  const {
    rows: [friend],
  } = await db.query(sql, [userId, friendId]);
  return friend;
}

// Get all friends for a user
export async function getFriendsByUserId(userId) {
  const sql = `
  SELECT users.id AS friend_id, phone, first_name, last_name
  FROM friends
  JOIN users ON friend_id = users.id
  WHERE user_id = $1
  `;
  const { rows: friends } = await db.query(sql, [userId]);
  return friends;
}
