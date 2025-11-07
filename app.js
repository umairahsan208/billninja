import express from "express";
const app = express();
export default app;
import cors from "cors";

import getUserFromToken from "./middleware/getUserFromToken.js";
import requireUser from "./middleware/requireUser.js";

import usersRouter from "./api/users.js";
import groupsRouter from "./api/groups.js";
// import billsRouter from "./api/bills.js";
import itemsRouter from "./api/items.js";

app.use(express.json());
app.use(getUserFromToken);

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use("/users", usersRouter);
app.use("/groups", requireUser, groupsRouter);
// app.use("/bills", requireUser, billsRouter
app.use("/items", requireUser, itemsRouter);
