import express from "express";
const app = express();
export default app;

import getUserFromToken from "./middleware/getUserFromToken";

import usersRouter from "./api/users";
import groupsRouter from "./api/groups";

app.use(express.json());
app.use(getUserFromToken);

app.use("/users", usersRouter);
app.use("/groups", groupsRouter);
