import express from "express";
import { RoleCode } from "../../..//database/model/Role";
import authentication from "../../../auth/authentication";
import authorization from "../../../auth/authorization";
import {
  create,
  getAll,
  deleteProject,
  getOne
} from "../../../controllers/project/projectController";


const router = express.Router();

router.post(
  "/",
  authentication,
  authorization([RoleCode.ADMIN, RoleCode.SUPERADMIN, RoleCode.USER]),
  create
);

router.get(
  "/",
  authentication,
  authorization([RoleCode.ADMIN, RoleCode.SUPERADMIN, RoleCode.USER]),
  getAll
);

router.get(
  "/:projectId",
  authentication,
  authorization([RoleCode.ADMIN, RoleCode.SUPERADMIN, RoleCode.USER]),
  getOne
);

router.delete(
  "/:projectId",
  authentication,
  authorization([RoleCode.ADMIN, RoleCode.SUPERADMIN, RoleCode.USER]),
  create
);

export default router;