import { RoleCode } from '../../database/model/Role';
import { RoleModel } from '../../database/model/Role';
import User from '../../database/model/User';
import { EMOJIS } from '../../constants/emojis';
import { UserModel } from '../../database/model/User';

export const seedSuperAdmin = async (
  roleCode: RoleCode.SUPERADMIN,
  email: string,
  name: string,
  password: string
) => {
  let roleSuperAdmin = await RoleModel.findOne({ code: roleCode });

  if (roleSuperAdmin) {
    let superAdmin = await UserModel.find({
      roles: roleSuperAdmin._id,
      deletedAt: null,
    }).countDocuments();

    if (superAdmin > 0) {
      console.log(`${roleCode} user exist`);
    } else {
      try {
        let superAdmin = {
          roles: [roleSuperAdmin],
          name,
          email,
          password,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await UserModel.create(superAdmin);

        console.log(
          `a new ${roleCode} has been created successfully ` + EMOJIS.SUCCESS
        );
      } catch (error) {
        console.log('error : ', error);
      }
    }
  } else {
    console.log('Role user inexistant !');
  }
};
