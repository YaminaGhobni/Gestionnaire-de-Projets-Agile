import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import NotificationRepo from '../../database/repository/NotificationRepo';
import { SuccessResponsePaginate } from '../../core/ApiResponse';

export const getAllNotifications = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const { page, perPage } = req.query;
    const options = {
      page: parseInt(page as string, 10) || 1,
      limit: parseInt(perPage as string, 10) || 10,
    };

    const notifications = await NotificationRepo.getAll(
      options,
      req.query,
      req.user.id
    );

    const { docs, ...meta } = notifications;
    new SuccessResponsePaginate(
      'All users returned successfuly',
      docs,
      meta
    ).send(res);
  }
);
