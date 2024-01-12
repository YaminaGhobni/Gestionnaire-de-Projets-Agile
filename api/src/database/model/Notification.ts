import { model, Schema, Document } from 'mongoose';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { preFindHook } from '../../helpers/databaseHooks';
import IUser from './User';

export const DOCUMENT_NAME = 'Notification';
export const COLLECTION_NAME = 'notifications';

export default interface Notification extends Document {
  userId: IUser | string;
  title: string;
  body: string;
  data: object;
  isRead: boolean;
  deletedAt?: Date;
}

const schema = new Schema<Notification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: Schema.Types.String,
      trim: true,
    },
    body: {
      type: Schema.Types.String,
      trim: true,
    },
    data: {
      taskId: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
      },
      meetingId: {
        type: Schema.Types.ObjectId,
        ref: 'Meeting',
      },
    },
    isRead: {
      type: Schema.Types.Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
preFindHook(schema, ['data.taskId', 'data.meetingId']);
schema.plugin(mongoosePagination);

export const NotificationModel = model<Notification, Pagination<Notification>>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
