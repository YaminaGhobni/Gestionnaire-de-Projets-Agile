import express from 'express';
import auth from './auth/auth';
import users from './user/user';
import tasks from './task/task';

const router = express.Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/tasks', tasks);

export default router;
