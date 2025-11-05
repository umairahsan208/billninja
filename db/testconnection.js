import db from "#db/client";

console.log("➡️ Starting DB test (top-level)...");

db.query("SELECT * FROM users LIMIT 5;")
  .then(({ rows, rowCount }) => {
    console.log("✅ Query ran.");
    console.log("Row count:", rowCount);
    console.log("Rows:", rows);
  })
  .catch((err) => {
    console.error("❌ DB test failed:");
    console.error(err);
  })
  .finally(() => {
    db.end().then(() => {
      console.log("🔌 Connection closed.");
    });
  });