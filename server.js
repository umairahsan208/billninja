import app from "./app.js";
import db from "./db/client.js"; // Import the client

const PORT = 3000;

async function startServer() {
  try {
    await db.connect(); // Connect to the database
    console.log("Connected to the database");

    app.listen(PORT, () => {
      console.log(`I am listening on port #${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

startServer();
