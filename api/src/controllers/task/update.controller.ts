import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import { TaskModel } from '../../database/model/Task';

export const updateTask = asyncHandler(async (req: ProtectedRequest, res) => {
  const { body } = req;
  const { id } = req.params;

  // Update the task
  const updatedTask = await TaskModel.findByIdAndUpdate(
    id,
    { $set: body },
    { new: true }
  );

  if (!updatedTask) {
    throw new BadRequestError('Task not found or update failed');
  }

  return new SuccessResponse('Task updated successfully', updatedTask).send(
    res
  );
});
