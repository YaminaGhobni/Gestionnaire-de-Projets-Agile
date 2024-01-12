import tasks from './task/task';
import meetings from './meeting/meeting';
import notifications from './notification/notification';
import express from 'express';
import auth from './auth/auth';
import users from './user/user';
import projects from './project/project';
import sprints from './sprint/sprint';
const router = express.Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/tasks', tasks);
router.use('/meetings', meetings);
router.use('/notifications', notifications);
router.use('/projects', projects);
router.use('/sprints', sprints);
export default router;
