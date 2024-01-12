import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import MeetingRepo from '../../database/repository/MeetingRepo';
import { SuccessResponsePaginate } from '../../core/ApiResponse';

export const getAllMeetings = asyncHandler(async (req: ProtectedRequest, res) => {
  const { page, perPage, deleted } = req.query;
  const options = {
    page: parseInt(page as string, 10) || 1,
    limit: parseInt(perPage as string, 12) || 12,
  };

  const meetings = await MeetingRepo.getAll(options, req.query, {
    isPaging: true,
    deleted: deleted == 'true' ? true : false,
  });

  const { docs, ...meta } = meetings;
  new SuccessResponsePaginate(
    'All meetings returned successfuly',
    docs,
    meta
  ).send(res);
});
