import express from 'express';
import authentication from '../../../auth/authentication';
import notificationController from '../../../controllers/notification';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';

const router = express.Router();

router.use('/', authentication);

router.route('/').get(notificationController.getAllNotifications);

router
  .route('/:id')
  .get(
    validator(schema.param, ValidationSource.PARAM),
    notificationController.getNotification
  )
  .put(
    validator(schema.param, ValidationSource.PARAM),
    validator(schema.update),
    notificationController.updateNotification
  )
  .delete(
    validator(schema.param, ValidationSource.PARAM),
    notificationController.removeNotification
  );
export default router;
