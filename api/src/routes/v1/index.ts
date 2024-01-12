import express from 'express';
import auth from './auth/auth';
import users from './user/user';
import tasks from './task/task';
import meetings from './meeting/meeting';
const router = express.Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/tasks', tasks);
router.use('/meetings', meetings);

export default router;
