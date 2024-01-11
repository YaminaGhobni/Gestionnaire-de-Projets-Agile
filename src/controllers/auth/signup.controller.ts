import { RoleRequest } from 'app-request';
import _ from 'lodash';
import { SuccessResponse } from '../../core/ApiResponse';
import User from '../../database/model/User';
import { RoleCode } from '../../database/model/Role';
import UserRepo from '../../database/repository/UserRepo';
import { BadRequestError } from '../../core/ApiError';
import asyncHandler from '../../helpers/asyncHandler';
import { sendEmail } from '../../helpers/emails';
import RoleRepo from '../../database/repository/RoleRepo';

export const signup = asyncHandler(async (req: RoleRequest, res) => {
  const { firstName, lastName, phoneNumber, email, password, userName } =
    req.body;
  let user = await UserRepo.getOneByObj({ email });
  if (user) throw new BadRequestError('User already registered');

  const roleUser = await RoleRepo.findByCode(RoleCode.USER);
  if (!roleUser) throw new BadRequestError('role not found');

  const createdUser = await UserRepo.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    verified: true,
    userName,
    roles: [roleUser._id],
  } as User);

  new SuccessResponse('Account created', createdUser).send(res);
});
