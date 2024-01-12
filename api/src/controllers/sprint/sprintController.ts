import { ProtectedRequest } from "app-request";
import { Response } from "express";
import { SprintModel } from "../../database/model/Sprint";
import { SuccessMsgResponse, SuccessResponse } from "../../core/ApiResponse";
import { ProjectModel } from "../../database/model/Project";
import asyncHandler from "../../helpers/asyncHandler";
import { BadRequestError, NotFoundError } from "../../core/ApiError";

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

export const getAll = asyncHandler(
  async (req: ProtectedRequest, res: Response) => {
    const { projectId } = req.params;
    const sprints = await SprintModel.find({ project: projectId });
    new SuccessResponse(
      "Sprints has been returned successfully!",
      sprints
    ).send(res);
  }
);

export const getOne = asyncHandler(
  async (req: ProtectedRequest, res: Response) => {
    const { sprintId } = req.params;
    const sprint = await SprintModel.findOne({ _id: sprintId });

    if (!sprint) {
      throw new NotFoundError("Sprint not found");
    }

    new SuccessResponse("Sprint has been returned successfully!", sprint).send(
      res
    );
  }
);

export const deleteOne = asyncHandler(
  async (req: ProtectedRequest, res: Response) => {
    const { sprintId } = req.params;

    const sprint = await ProjectModel.findOne({ _id: sprintId });

    if (req.user._id !== sprint?.lead) {
      throw new BadRequestError("Only lead can delete this sprint");
    }

    await sprint?.delete();

    return new SuccessMsgResponse("Project successfully sprint").send(res);
  }
);
