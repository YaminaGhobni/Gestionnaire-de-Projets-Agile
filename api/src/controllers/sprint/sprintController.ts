import { ProtectedRequest } from "app-request";
import { Response } from "express";
import { SuccessResponse } from "../../core/ApiResponse";
import { ProjectModel } from "../../database/model/Project";
import asyncHandler from "../../helpers/asyncHandler";

export const create = asyncHandler(
  async (req: ProtectedRequest, res: Response) => {
    const { name, members, status, project } = req.body;

    const newProject = await ProjectModel.create({
      name,
      members,
      status,
      project,
      lead: req.user.id,
    });
    new SuccessResponse(
      "Sprint has been created successfully!",
      newProject
    ).send(res);
  }
);
