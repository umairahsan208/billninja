import express from "express";
const router = express.Router();
export default router;

import requireUser from "../middleware/requireUser.js";
import requireBody from "../middleware/requireBody.js";

import {
  getItemsByGroupId,
  getItemById,
  createItems,
  deleteItem,
} from "../db/queries/items.js";
import { createUserItem, payUserItem } from "../db/queries/users_items.js";

router.use(requireUser);

router
  .route("/")
  .get(async (req, res) => {
    const items = await getItemsByGroupId(req.group.id);
    res.send(items);
  })
  .post(
    requireBody(["name", "cost", "groupId", "payerUserId", "owers"]),
    async (req, res) => {
      const { name, cost, groupId, payerUserId, owers } = req.body;
      try {
        const groupUsers = await getGroupUserByUserId(req.group.id);
        const item = await createItems({ name, cost, groupId, payerUserId });
        for (const userId of owers) {
          await createUserItem(userId, item.id);
        }
        res.status(201).send(item);
      } catch (error) {
        console.error(error);
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
    res.status(200).send("Item Payed");
  } catch (error) {
    console.error(error);
  }
});
