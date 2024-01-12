import express from 'express';
import auth from './auth/auth';
import users from './user/user';
import meetings from './meeting/meeting';
import notifications from './notification/notification';
const router = express.Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/meetings', meetings);
router.use('/notifications', notifications);

export default router;
