import express from "express";
import auth from "./auth/auth";
import users from "./user/user";
import projects from "./project/project";
import sprints from "./sprint/sprint";
const router = express.Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/projects", projects);
router.use("/sprints", sprints);
export default router;
