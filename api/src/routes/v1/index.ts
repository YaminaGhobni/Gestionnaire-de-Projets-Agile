import express from 'express';
import auth from './auth/auth';
import users from './user/user';
const router = express.Router();

router.use('/auth', auth);
router.use('/users', users);
export default router;
