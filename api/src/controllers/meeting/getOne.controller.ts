import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import MeetingRepo from '../../database/repository/MeetingRepo';
import { SuccessResponse } from '../../core/ApiResponse';

export const getMeeting = asyncHandler(async (req: ProtectedRequest, res) => {
  const { id } = req.params;
  const meeting = await MeetingRepo.getOneById(id);
  if (!meeting) throw new BadRequestError('Meeting not found');
  return new SuccessResponse('success', meeting).send(res);
});
