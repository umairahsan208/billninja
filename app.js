import express from "express";
const app = express();
export default app;

import getUserFromToken from "./middleware/getUserFromToken";
import requireUser from "./middleware/requireUser";

import usersRouter from "./api/users";
import groupsRouter from "./api/groups";
import billsRouter from "./api/bills";
import itemsRouter from "./api/items";

app.use(express.json());
app.use(getUserFromToken);

app.use("/users", usersRouter);
app.use("/groups", requireUser, groupsRouter);
app.use("/bills", requireUser, billsRouter);
app.use("/items", requireUser, itemsRouter);
