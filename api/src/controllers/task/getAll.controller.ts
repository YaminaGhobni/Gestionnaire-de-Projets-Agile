import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { SuccessResponse } from '../../core/ApiResponse';
import { TaskModel } from '../../database/model/Task';

export const getAllTasks = asyncHandler(async (req: ProtectedRequest, res) => {
  const tasks = await TaskModel.find({});

  new SuccessResponse('All tasks returned successfully', tasks).send(res);
});


