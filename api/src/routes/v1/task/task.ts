import express from 'express';
import FileUploadHandler from '../../../helpers/fileUpload';
import authentication from '../../../auth/authentication';
import authorization from '../../../auth/authorization';
import taskController from '../../../controllers/task';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import { RoleCode } from '../../../database/model/Role';

const fileUploadHandler = new FileUploadHandler();
const router = express.Router();

router.use(
  '/',
  authentication,
  
);

router
  .route('/')
  .post(
    authorization([RoleCode.ADMIN, RoleCode.SUPERADMIN]),
    validator(schema.create),
    taskController.createTask
  )
  .get(
    authorization([RoleCode.ADMIN, RoleCode.SUPERADMIN]),
    taskController.getAllTasks
  );

router
  .route('/:id')
  .get(
    authorization([RoleCode.ADMIN, RoleCode.SUPERADMIN]),
    validator(schema.param, ValidationSource.PARAM),
    taskController.getTask
  )
  .put(
    fileUploadHandler.handleSingleFileUpload('file'),
    authorization([RoleCode.ADMIN, RoleCode.SUPERADMIN]),
    validator(schema.param, ValidationSource.PARAM),
    validator(schema.update),
    taskController.updateTask
  )
  .delete(
    authorization([RoleCode.ADMIN, RoleCode.SUPERADMIN]),
    validator(schema.param, ValidationSource.PARAM),
    taskController.removeTask
  );

export default router;
