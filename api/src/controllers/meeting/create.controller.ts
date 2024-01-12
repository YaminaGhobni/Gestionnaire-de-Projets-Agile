import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import MeetingRepo from '../../database/repository/MeetingRepo';
import { SuccessMsgResponse, SuccessResponse } from '../../core/ApiResponse';
import { BadRequestError } from '../../core/ApiError';

export const createMeeting = asyncHandler(async (req: ProtectedRequest, res) => {
  const { body } = req;

  const newMeeting = await MeetingRepo.create({ ...body });
  new SuccessResponse('Meeting has been created successfully!', newMeeting).send(res);
});
