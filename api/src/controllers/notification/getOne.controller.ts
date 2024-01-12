import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import NotificationRepo from '../../database/repository/NotificationRepo';
import { SuccessResponse } from '../../core/ApiResponse';

export const getNotification = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const { id } = req.params;
    const notification = await NotificationRepo.getOneById(id);
    if (!notification) throw new BadRequestError('Notification not found');
    return new SuccessResponse('success', notification).send(res);
  }
);
