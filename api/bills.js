import express from "express";
const router = express.Router();
export default router;

import requireUser from "../middleware/requireUser";
import requireBody from "../middleware/requireBody";
import {
  getBills,
  getBillsByGroupId,
  getBillById,
  createBill,
  deleteBill,
} from "../db/queries/bill.js";
import { getGroupById } from "../db/queries/groups.js";
import { getGroupUserByUserId } from "../db/queries/groups_users.js";
import { getItemsByBillId } from "../db/queries/items.js";

router.use(requireUser);

router
  .route("/")
  .get(async (req, res) => {
    const bills = await getBillsByGroupId(req.group.id);
    res.send(bills);
  })
  .post(requireBody(["name"]), async (req, res) => {
    const { name } = req.body;
    const bill = await createBill(name);
    res.status(201).send(bill);
  });

router.param("id", async (req, res, next, id) => {
  const bill = await getBillById(id);
  if (!bill) return res.status(404).send("Bill not found.");
  req.bill = bill;
  next();
});

router
  .route("/:id")
  .get(async (req, res) => {
    res.send(req.bill);
  })
  .delete(async (req, res) => {
    await deleteBill(req.bill.id);
    res.status(204).send();
  });
