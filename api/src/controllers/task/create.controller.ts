import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { SuccessMsgResponse, SuccessResponse } from '../../core/ApiResponse';
import { TaskModel, Priority, Status } from '../../database/model/Task';
import { BadRequestError } from '../../core/ApiError';
import { sendNotifUser } from '../../helpers/notif';

export const createTask = asyncHandler(async (req: ProtectedRequest, res) => {
  const { body } = req;

  try {
    const { user } = req;

    // Assuming assignedUsers is an array of user IDs
    const { assignedUsers, ...taskData } = body;

    const newTask = await TaskModel.create({
      ...taskData,
      assignedUsers: Array.isArray(assignedUsers)
        ? assignedUsers
        : [assignedUsers],
    });

    if (!newTask) {
      return new SuccessResponse('Failed to create task', 500).send(res);
    }

    if (assignedUsers) {
      await Promise.all(
        assignedUsers.map(async (id: any) => {
          await sendNotifUser(id, {
            title: 'New Task',
            body: `You have been assigned to a new task.`,
            data: { taskId: newTask._id },
          });
        })
      );
    }

    return new SuccessMsgResponse('Task created successfully!').send(res);
  } catch (error) {
    console.error('Error creating task:', error);

    if (SuccessResponse.name === 'ValidationError') {
      return new SuccessResponse(
        'Validation error. Please check your input.',
        400
      ).send(res);
    }
  }
});
