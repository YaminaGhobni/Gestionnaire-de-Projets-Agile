import { Schema, model, Document } from "mongoose";
import IUser from "./User";

export const DOCUMENT_NAME = "Project";
export const COLLECTION_NAME = "projects";

export default interface IProject extends Document {
  name: string;
  lead: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IProject>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    lead: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ProjectModel = model<IProject>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
