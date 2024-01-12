import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import UserRepo from '../../database/repository/UserRepo';
import { SuccessMsgResponse, SuccessResponse } from '../../core/ApiResponse';
import RoleRepo from '../../database/repository/RoleRepo';
import { RoleCode } from '../../database/model/Role';

export const updateUser = asyncHandler(async (req: any, res) => {
  const { body } = req;
  const { id } = req.params;

  // Handle role update
  if (body.role) {
    const roleFromBody = await RoleRepo.findByCode(body.role);
    if (!roleFromBody) {
      return new SuccessMsgResponse('No roles found with that name 🤨').send(
        res
      );
    }

    if (roleFromBody.code === RoleCode.SUPERADMIN) {
      return new SuccessMsgResponse(
        "You can't update to a super admin role 🤨"
      ).send(res);
    }

    body.roles = [roleFromBody._id];
  }

  if (req.file) {
    body.profilePicUrl = req.file.path;
  }

  const updatedUser = await UserRepo.update(id, body);

  if (!updatedUser) {
    throw new BadRequestError('User not found or update failed');
  }

  return new SuccessResponse('User updated successfully', updatedUser).send(
    res
  );
});
