import express from 'express';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import authentication from '../../../auth/authentication';
import auth from '../../../controllers/auth';
import { tokenSchema } from '../global.routes.schema';
import FileUploadHandler from '../../../helpers/fileUpload';
import userAuth from '../../../controllers/auth';

import uploadMediaFilesToThisFolder from '../../../helpers/fileUpload/uploadDestiny';

const router = express.Router();
const fileUploadHandler = new FileUploadHandler();
router.post('/signup', validator(schema.signup), userAuth.signup);
router.post('/login', validator(schema.userLogin), userAuth.login);

router.use('/', authentication);

router.delete('/logout', userAuth.logout);

export default router;
