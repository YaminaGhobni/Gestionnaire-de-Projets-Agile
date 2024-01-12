import { ProtectedRequest } from "app-request";
import { Response } from "express";
import asyncHandler from "../../helpers/asyncHandler";
import { ProjectModel } from "../../database/model/Project";
import { SuccessMsgResponse, SuccessResponse } from "../../core/ApiResponse";
import { BadRequestError } from "../../core/ApiError";

export const create = asyncHandler(
  async (req: ProtectedRequest, res: Response) => {
    const { name } = req.body;

    const newProject = await ProjectModel.create({ name, lead: req.user.id });
    new SuccessResponse(
      "Project has been created successfully!",
      newProject
    ).send(res);
  }
);

export const deleteProject = asyncHandler(
  async (req: ProtectedRequest, res: Response) => {
    const { projectId } = req.params;

    const project = await ProjectModel.findOne({ _id: projectId });

    if (req.user._id !== project?.lead) {
      throw new BadRequestError('Only lead can delete this project');
    }

    await project?.delete();

    return new SuccessMsgResponse("Project successfully deleted").send(res);
  }
);
