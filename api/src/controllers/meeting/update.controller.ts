import asyncHandler from '../../helpers/asyncHandler';
import { BadRequestError } from '../../core/ApiError';
import MeetingRepo from '../../database/repository/MeetingRepo';
import { SuccessResponse } from '../../core/ApiResponse';

export const updateMeeting = asyncHandler(async (req: any, res) => {
  const { body } = req;
  const { id } = req.params;

  const updatedMeeting = await MeetingRepo.update(id, body);

  if (!updatedMeeting) {
    throw new BadRequestError('Meeting not found or update failed');
  }

  return new SuccessResponse('Meeting updated successfully', updatedMeeting).send(
    res
  );
});
