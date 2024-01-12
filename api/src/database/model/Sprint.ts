import { Schema, model, Document } from "mongoose";
import IProject from "./Project";
import IUser from "./User";

export const DOCUMENT_NAME = "Sprint";
export const COLLECTION_NAME = "sprints";

export default interface ISprint extends Document {
  name: string;
  lead: IUser;
  members: IUser[];
  status: string;
  project: IProject;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<ISprint>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      required: true,
    },
    lead: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const SprintModel = model<ISprint>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
