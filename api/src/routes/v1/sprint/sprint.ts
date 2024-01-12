import express from "express";
import { RoleCode } from "../../..//database/model/Role";
import authentication from "../../../auth/authentication";
import authorization from "../../../auth/authorization";
import {
  create,
  getAll,
  deleteOne,
  getOne
} from "../../../controllers/sprint/sprintController";


const router = express.Router();

router.post(
  "/",
  authentication,
  authorization([RoleCode.ADMIN, RoleCode.SUPERADMIN, RoleCode.USER]),
  create
);

router.get(
  "/projects/:projetId",
  authentication,
  authorization([RoleCode.ADMIN, RoleCode.SUPERADMIN, RoleCode.USER]),
  getAll
);

router.get(
  "/:sprintId",
  authentication,
  authorization([RoleCode.ADMIN, RoleCode.SUPERADMIN, RoleCode.USER]),
  getOne
);

router.delete(
  "/:projectId",
  authentication,
  authorization([RoleCode.ADMIN, RoleCode.SUPERADMIN, RoleCode.USER]),
  deleteOne
);

export default router;