import app from "./app.js";
import db from "./db/client.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await db.connect();
    console.log("Connected to the database");

    app.listen(PORT, () => {
      console.log(`I am listening on port #${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

startServer();
