import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../helpers/validator';

export default {
  param: Joi.object().keys({
    id: JoiObjectId().required(),
  }),
  profile: Joi.object().keys({
    name: Joi.string().optional().min(1).max(200),
    lastname: Joi.string().optional().min(1).max(200),
    profilePicUrl: Joi.string().optional().uri(),
  }),
  create: Joi.object().keys({
    firstName: Joi.string().required().min(1).max(200),
    lastName: Joi.string().min(1).max(200).empty(''),
    userName: Joi.string().min(1).max(200),
    email: Joi.string().required().email(),
    phoneNumber: Joi.string().optional().min(1).max(200).empty(''),
    role: Joi.string().required().min(1).max(200).empty(''),
    password: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9]{8,30}$/),
    profilePicUrl: Joi.string().optional().uri(),
  }),
  update: Joi.object().keys({
    firstName: Joi.string().optional().min(1).max(200),
    lastName: Joi.string().min(1).max(200).empty(''),
    userName: Joi.string().min(1).max(200),
    email: Joi.string().optional().email(),
    phoneNumber: Joi.string().optional().min(1).max(200).empty(''),
    role: Joi.string().optional().min(1).max(200).empty(''),
    password: Joi.string()
      .optional()
      .regex(/^[a-zA-Z0-9]{8,30}$/),
    profilePicUrl: Joi.string().optional().uri(),
  }),
};
