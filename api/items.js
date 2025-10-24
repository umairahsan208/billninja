import express from "express";
const router = express.Router();
export default router;

import requireUser from "../middleware/requireUser.js";
import requireBody from "../middleware/requireBody.js";

import { getItems, createItems, deleteItem } from "../db/queries/items.js";
import {
  createUserItem,
  payUserItem,
  checkUserOwed,
} from "../db/queries/users_items.js";

router.use(requireUser);

router
  .route("/")
  .get(async (req, res) => {
    const itemss = await getItemsByBillId(req.group.id);
    res.send(bills);
  })
  .post(
    requireBody(["name", "cost", "bill_id", "payer_user_id", "user_names"]),
    async (req, res) => {
      const { name, cost, bill_id, payer_user_id, user_names } = req.body;
      const payer = await getUserByName(payer_user_id);
      const users = [];
      for (const user_name of User_names) {
        const user = await getUserByName(user_name);
        if (!user) return res.status(404).send("User not fount");
        user.push(user);
      }

      const item = await createItems(name, cost, bill_id, payer.id);
      for (const user of users) {
        await createUserItem(user.id, item.id, false);
      }
      res.send(item);
    }
  );
