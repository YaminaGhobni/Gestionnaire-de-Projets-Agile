import express from 'express';
import FileUploadHandler from '../../../helpers/fileUpload';
import authentication from '../../../auth/authentication';
import authorization from '../../../auth/authorization';
import userController from '../../../controllers/user';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import { RoleCode } from '../../../database/model/Role';
const fileUploadHandler = new FileUploadHandler();
const router = express.Router();

router.use(
  '/',
  authentication,
  authorization([RoleCode.ADMIN, RoleCode.SUPERADMIN, RoleCode.USER])
);

router
  .route('/')
  .post(
    authorization([RoleCode.ADMIN, RoleCode.SUPERADMIN]),
    validator(schema.create),
    userController.createUser
  )
  .get(
    authorization([RoleCode.ADMIN, RoleCode.SUPERADMIN]),
    userController.getAllUsers
  );

router
  .route('/me')
  .get(
    authorization([RoleCode.ADMIN, RoleCode.SUPERADMIN, RoleCode.USER]),
    userController.getMyProfile
  )
  .put(
    fileUploadHandler.handleSingleFileUpload('file'),
    authorization([RoleCode.ADMIN, RoleCode.SUPERADMIN, RoleCode.USER]),
    userController.updateProfile
  );

router
  .route('/:id')
  .get(
    authorization([RoleCode.ADMIN, RoleCode.SUPERADMIN]),
    validator(schema.param, ValidationSource.PARAM),
    userController.getUser
  )
  .put(
    fileUploadHandler.handleSingleFileUpload('file'),
    authorization([RoleCode.ADMIN, RoleCode.SUPERADMIN]),
    validator(schema.param, ValidationSource.PARAM),
    validator(schema.update),
    userController.updateUser
  )
  .delete(
    authorization([RoleCode.ADMIN, RoleCode.SUPERADMIN]),
    validator(schema.param, ValidationSource.PARAM),
    userController.removeUser
  );
export default router;
