import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import { SuccessMsgResponse } from '../../core/ApiResponse';
import NotificationRepo from '../../database/repository/NotificationRepo';

export const removeNotification = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const { id } = req.params;
    const notification = await NotificationRepo.remove(id);
    if (!notification) throw new BadRequestError('Notification not found');
    return new SuccessMsgResponse('Notification Deleted').send(res);
  }
);
