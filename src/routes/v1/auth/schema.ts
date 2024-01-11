import Joi from '@hapi/joi';
import { JoiAuthBearer } from '../../../helpers/validator';
import { JoiObjectId } from '../../../helpers/validator';

export default {
  userLogin: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9]{8,30}$/),
  }),

  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),

  signup: Joi.object().keys({
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required().min(3),
    userName: Joi.string().required().min(3),
    email: Joi.string().required().email().required(),
    phoneNumber: Joi.string().required().min(8).required(),
    password: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9]{8,30}$/),
  }),
};
