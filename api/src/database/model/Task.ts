import { model, Schema, Document, Types } from 'mongoose';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { preFindHook } from '../../helpers/databaseHooks';

export const DOCUMENT_NAME = 'Task';
export const COLLECTION_NAME = 'tasks';

export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export enum Status {
  Pending = 'Pending',
  ToDo = 'To Do',
  InProgress = 'In Progress',
  Completed = 'Completed',
  Tested = 'Tested',
  Done = 'Done',
}

interface ITask extends Document {
  startTime?: Date;
  endTime?: Date;
  priority?: Priority;
  status?: Status;
  description?: string;
  assignedUsers?: Types.ObjectId[]; // List of user IDs assigned to the task
}

const taskSchema = new Schema<ITask>(
  {
    startTime: {
      type: Schema.Types.Date,
    },
    endTime: {
      type: Schema.Types.Date,
    },
    priority: {
      type: Schema.Types.String,
      enum: Object.values(Priority),
    },
    status: {
      type: Schema.Types.String,
      enum: Object.values(Status),
    },
    description: {
      type: Schema.Types.String,
    },
    assignedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User', // Assuming 'User' is the model name for the user schema
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
preFindHook(taskSchema,['assignedUsers']);
taskSchema.plugin(mongoosePagination);

export const TaskModel = model<ITask, Pagination<ITask>>(
  DOCUMENT_NAME,
  taskSchema,
  COLLECTION_NAME
);
