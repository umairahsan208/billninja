import express from "express";
const router = express.Router();
export default router;

import requireUser from "../middleware/requireUser.js";
import requireBody from "../middleware/requireBody.js";
import { getUserByPhone } from "../db/queries/users.js";
import {
  getGroupsByUserId,
  getGroupById,
  createGroupAndAddAsUser,
  deleteGroup,
} from "../db/queries/groups.js";
import {
  createGroupUser,
  getGroupUserByUserId,
} from "../db/queries/groups_users.js";

router.use(requireUser);

router
  .route("/")
  .get(async (req, res) => {
    const groups = await getGroupsByUserId(req.user.id);
    res.send(groups);
  })
  .post(requireBody(["name", "groupUsers"]), async (req, res) => {
    const { name, groupUsers } = req.body;
    try {
      const group = await createGroupAndAddAsUser(name, req.user.id);
      for (const phone of groupUsers) {
        const user = await getUserByPhone(phone);
        if (user) {
          await createGroupUser(group.id, user.id);
        }
      }
      const members = await getGroupUserByUserId(group.id);
      res.status(201).send({ group, members });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });

router.param("id", async (req, res, next, id) => {
  const group = await getGroupById(id);
  if (!group) return res.status(404).send("Group not found.");
  req.group = group;
  next();
});

router
  .route("/:id")
  .get(async (req, res) => {
    const members = await getGroupUserByUserId(req.group.id);
    res.send({ group: req.group, members });
  })
  .delete(async (req, res) => {
    try {
      await deleteGroup(req.group.id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });
