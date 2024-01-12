import express from 'express';
import authentication from '../../../auth/authentication';
import meetingController from '../../../controllers/meeting';
const router = express.Router();

router.use(
  '/',
  authentication,
);

router
  .route('/')
  .post(
    meetingController.createMeeting
  )
  .get(
    meetingController.getAllMeetings
  );

router
  .route('/:id')
  .get(
    meetingController.getMeeting
  )
  .put(
    meetingController.updateMeeting
  )
  .delete(
    meetingController.removeMeeting
  );

export default router;
