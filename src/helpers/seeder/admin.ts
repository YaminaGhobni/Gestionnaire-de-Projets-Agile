import { RoleCode } from '../../database/model/Role';
import { RoleModel } from '../../database/model/Role';
import User from '../../database/model/User';
import { EMOJIS } from '../../constants/emojis';
import { UserModel } from '../../database/model/User';

export const seedAdmin = async (
  roleCode: RoleCode.ADMIN,
  email: string,
  name: string,
  password: string
) => {
  let roleAdmin = await RoleModel.findOne({ code: roleCode });

  if (roleAdmin) {
    let admin = await UserModel.find({
      roles: roleAdmin._id,
      deletedAt: null,
    }).countDocuments();

    if (admin > 0) {
      console.log(`${roleCode} user exist`);
    } else {
      try {
        let admin = {
          roles: [roleAdmin],
          name,
          email,
          password,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await UserModel.create(admin);

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
