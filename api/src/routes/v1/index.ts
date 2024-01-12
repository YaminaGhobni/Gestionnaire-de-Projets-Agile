import express from "express";
import auth from "./auth/auth";
import users from "./user/user";
import projects from "./project/project";
const router = express.Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/projects", projects);
export default router;
