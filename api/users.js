import express from "express";
const router = express.Router();
export default router;

import {
  createUser,
  getUserByPhoneAndPassword,
  deleteUser,
  getUserByPhone,
} from "../db/queries/users";
import { getFriendsByUserId, createFriend } from "../db/queries/friends";
import requireBody from "../middleware/requireBody";
import requireUser from "../middleware/requireUser";
import { createToken } from "../middleware/jwt";

router
  .route("/register")
  .post(
    requireBody(["phone", "password", "first_name", "last_name"]),
    async (req, res) => {
      const { phone, password, first_name, last_name } = req.body;
      const user = await createUser(phone, password, first_name, last_name);

      const token = createToken({ id: user.id });
      res.status(201).send(token);
    }
  );

router
  .route("/login")
  .post(requireBody(["phone", "password"]), async (req, res) => {
    const { phone, password } = req.body;
    const user = await getUserByPhoneAndPassword(phone, password);
    if (!user) return res.status(401).send("Invalid number or password.");
    const token = { id: user.id };
    res.send(token);
  });

router.route("/deleteAccount").delete(requireUser, async (req, res) => {
  await deleteUser(req.user.id);
  res.status(204);
});

router
  .route("/friends")
  .get(requireUser, async (req, res) => {
    const friends = await getFriendsByUserId(req.user.id);
    res.send(friends);
  })
  .post(requireUser, requireBody(["phone"]), async (req, res) => {
    const { phone } = req.body;
    const friend = await getUserByPhone(phone);
    if (!friend) return res.status(404).send("User not found");

    try {
      await createFriend(req.user.id, friend.id);
      res.status(201);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });
