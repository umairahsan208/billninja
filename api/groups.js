import express from "express";
const router = express.Router();
export default router;

import requireBody from "../middleware/requireBody";
import { getUserByPhone } from "../db/queries/users";
import {
  getGroupsByUserId,
  getGroupById,
  createGroup,
  deleteGroup,
} from "../db/queries/groups";
import {
  createGroupUser,
  getGroupUserByUserId,
} from "../db/queries/groups_users";

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
      const group = await createGroup(name);
      await createGroupUser(group.id, req.user.id);
      for (const phone of groupUsers) {
        const user = await getUserByPhone(phone);
        if (user) {
          await createGroupUser(group.id, user.id);
        }
      }
      res.status(201).send(group);
    } catch (error) {
      console.error(error);
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
    try {
      const members = await getGroupUserByUserId(req.group.id);
      res.send({ members });
    } catch (error) {
      console.error(error);
    }
  })
  .delete(async (req, res) => {
    try {
      await deleteGroup(req.group.id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
    }
  });
