import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import UserRepo from '../../database/repository/UserRepo';
import { SuccessMsgResponse, SuccessResponse } from '../../core/ApiResponse';
import RoleRepo from '../../database/repository/RoleRepo';
import { RoleCode } from '../../database/model/Role';
import { BadRequestError } from '../../core/ApiError';

export const createUser = asyncHandler(async (req: ProtectedRequest, res) => {
  const { body } = req;
  let roleUser = await RoleRepo.findByCode(RoleCode.ADMIN);
  let role: any;
  role = roleUser;

  let user = await UserRepo.getOneByObj({ email: req.body.email });
  if (user) throw new BadRequestError('User already registered');

  let roleFromBody = await RoleRepo.findByCode(req.body.role);
  if (!roleFromBody)
    return new SuccessMsgResponse('no roles found with that name 🤨').send(res);

  if (roleFromBody.code === RoleCode.SUPERADMIN)
    return new SuccessMsgResponse(
      'you cant create a super admin from here 🤨'
    ).send(res);

  if (req.user.roles[0].code === RoleCode.SUPERADMIN) {
    role = roleFromBody;
  }
  if (roleFromBody.code !== RoleCode.ADMIN) {
    role = roleFromBody;
  } else {
    return new SuccessMsgResponse(
      'only super admin can creaete other admins 🤨'
    ).send(res);
  }

  const newUser = await UserRepo.create({ ...body, roles: [role?._id] });
  new SuccessResponse('User has been created successfully!', newUser).send(res);
});
