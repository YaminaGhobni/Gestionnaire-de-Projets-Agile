import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import { TaskModel } from '../../database/model/Task';

export const removeTask = asyncHandler(async (req: ProtectedRequest, res) => {
  const { id } = req.params;


  const removedTask = await TaskModel.findByIdAndRemove(id);

  if (!removedTask) {
    throw new BadRequestError('Task not found or removal failed');
  }

  return new SuccessResponse('Task removed successfully', removedTask).send(res);
});
