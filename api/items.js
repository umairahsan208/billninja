import express from "express";
const router = express.Router();
export default router;

import requireUser from "../middleware/requireUser.js";
import requireBody from "../middleware/requireBody.js";

import {
  getItemsByGroupId,
  getItemById,
  createItem,
  deleteItem,
} from "../db/queries/items.js";
import { createUserItem, payUserItem } from "../db/queries/items_users.js";
import { getGroupUserByUserId } from "../db/queries/groups_users.js";
import { getUserById } from "../db/queries/users.js";

router.use(requireUser);

router
  .route("/")
  .get(async (req, res) => {
    const { groupId } = req.query;
    if (!groupId) return res.status(400).send("groupId is required");
    const items = await getItemsByGroupId(groupId);
    res.send(items);
  })
  .post(
    requireBody(["name", "cost", "groupId", "payerUserId", "owers"]),
    async (req, res) => {
      const { name, cost, groupId, payerUserId, owers } = req.body;
      try {
        const groupUsers = await getGroupUserByUserId(groupId);
        const item = await createItem(name, cost, groupId, payerUserId);
        const owerInfo = [];
        for (const userId of owers) {
          await createUserItem(userId, item.id);
          const user = await getUserById(userId);
          if (user) owerInfo.push(user);
        }
        res.status(201).send({ item, owers: owerInfo });
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
      }
    }
  );

router.param("id", async (req, res, next, id) => {
  const item = await getItemById(id);
  if (!item) return res.status(404).send("Item not found.");
  req.item = item;
  next();
});

router.route("/:id").delete(async (req, res) => {
  try {
    await deleteItem(req.item.id);
    res.status(204).send();
  } catch (error) {}
});

router.put("/:id/pay", async (req, res) => {
  try {
    await payUserItem(req.user.id, req.item.id);
    res.status(200).send("Item Paid");
  } catch (error) {
    console.error(error);
  }
});
