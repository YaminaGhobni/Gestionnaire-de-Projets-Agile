import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import { TaskModel } from '../../database/model/Task';

export const getTask = asyncHandler(async (req: ProtectedRequest, res) => {
  const { id } = req.params;
  const task = await TaskModel.findById(id);

  if (!task) {
    throw new BadRequestError('Task not found');
  }

  return new SuccessResponse('Success', task).send(res);
});
