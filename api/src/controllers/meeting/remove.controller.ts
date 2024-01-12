import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import { SuccessMsgResponse } from '../../core/ApiResponse';
import MeetingRepo from '../../database/repository/MeetingRepo';

export const removeMeeting = asyncHandler(async (req: ProtectedRequest, res) => {
  const { id } = req.params;
  const meeting = await MeetingRepo.remove(id);
  if (!meeting) throw new BadRequestError('Meeting not found');
  return new SuccessMsgResponse('Meeting Deleted').send(res);
});
