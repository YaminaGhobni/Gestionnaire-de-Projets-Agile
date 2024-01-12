import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import MeetingRepo from '../../database/repository/MeetingRepo';
import { SuccessMsgResponse, SuccessResponse } from '../../core/ApiResponse';
import { BadRequestError } from '../../core/ApiError';
import { sendNotifUser, sendNotifUserMessage } from '../../helpers/notif';

export const createMeeting = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const { body } = req;

    const newMeeting = await MeetingRepo.create({ ...body });

    if (body.members) {
      await Promise.all(
        body.members.map(async (id: any) => {
          await sendNotifUser(id, {
            title: 'New metting',
            body: `You have a new meeting.`,
            data: { meetingId: newMeeting._id },
          });
        })
      );
    }

    new SuccessResponse(
      'Meeting has been created successfully!',
      newMeeting
    ).send(res);
  }
);
