import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import NotificationRepo from '../../database/repository/NotificationRepo';
import { SuccessResponse } from '../../core/ApiResponse';

export const createNotification = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const { body } = req;
    const notification = await NotificationRepo.create(body);
    new SuccessResponse(
      'Notification has been created successfully!',
      notification
    ).send(res);
  }
);
