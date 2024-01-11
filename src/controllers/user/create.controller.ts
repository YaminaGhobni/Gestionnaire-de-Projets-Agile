import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import UserRepo from '../../database/repository/UserRepo';
import { SuccessResponse } from '../../core/ApiResponse';
import RoleRepo from '../../database/repository/RoleRepo';
import { RoleCode } from '../../database/model/Role';

export const createUser = asyncHandler(async (req: ProtectedRequest, res) => {
  const { body } = req;
  let roleUser = await RoleRepo.findByCode(RoleCode.ADMIN);
  const user = await UserRepo.create({ ...body, roles: [roleUser?._id] });
  new SuccessResponse('User has been created successfully!', user).send(res);
});
