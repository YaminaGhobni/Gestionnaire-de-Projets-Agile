import { model, Schema, Document } from 'mongoose';
import User from './User';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { preFindHook } from '../../helpers/databaseHooks';

export const DOCUMENT_NAME = 'Meeting';
export const COLLECTION_NAME = 'meetings';

export default interface IMeeting extends Document {
    title?: string;
    subject?: string;
    room?: string;
    members?: User[];
    meetingDate?: Date;
    deletedAt?: Date;
}

const schema = new Schema<IMeeting>(
    {
        title: {
            type: Schema.Types.String,
            trim: true,
        },
        subject: {
            type: Schema.Types.String,
            trim: true,
        },
        room: {
            type: Schema.Types.String,
            trim: true,
        },
        members: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
            ],
        },
        meetingDate: {
            type: Date,
            default: null,
            select: false,
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
preFindHook(schema);
schema.plugin(mongoosePagination);
schema.pre('save', async function (this: IMeeting, next) {
    next();
});


export const MeetingModel = model<IMeeting, Pagination<IMeeting>>(
    DOCUMENT_NAME,
    schema,
    COLLECTION_NAME
);
