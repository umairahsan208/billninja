import express from "express";
import cors from "cors";

const app = express();
export default app;

const allowedOrigins = [
  "http://localhost:5173",
  "https://billninja.netlify.app",
  "https://690fd7b056d7c200088fc430--billninja.netlify.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

import getUserFromToken from "./middleware/getUserFromToken.js";
import requireUser from "./middleware/requireUser.js";

import usersRouter from "./api/users.js";
import groupsRouter from "./api/groups.js";
// import billsRouter from "./api/bills.js";
import itemsRouter from "./api/items.js";

app.use(express.json());
app.use(getUserFromToken);

app.use("/users", usersRouter);
app.use("/groups", requireUser, groupsRouter);
// app.use("/bills", requireUser, billsRouter
app.use("/items", requireUser, itemsRouter);
