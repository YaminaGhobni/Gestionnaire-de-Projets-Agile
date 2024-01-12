import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import NotificationRepo from '../../database/repository/NotificationRepo';
import { SuccessResponse } from '../../core/ApiResponse';

export const updateNotification = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const { body } = req;
    const { id } = req.params;
    const notification = await NotificationRepo.update(id, body);
    if (!notification) throw new BadRequestError('notification not found');
    return new SuccessResponse('Notification updated', notification).send(res);
  }
);
