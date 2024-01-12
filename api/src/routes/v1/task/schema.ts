import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../helpers/validator';

export default {
  param: Joi.object().keys({
    id: JoiObjectId().required(),
  }),
  create: Joi.object().keys({
    startTime: Joi.date().optional(),
    endTime: Joi.date().optional(),
    priority: Joi.string().valid('Low', 'Medium', 'High').optional(),
    status: Joi.string().valid(
      'Pending',
      'To Do',
      'In Progress',
      'Completed',
      'Tested',
      'Done'
    ).optional(),
    description: Joi.string().optional().min(1).max(200),
    assignedUsers: Joi.array().items(JoiObjectId()).optional(),
  }),
  update: Joi.object().keys({
    startTime: Joi.date().optional(),
    endTime: Joi.date().optional(),
    priority: Joi.string().valid('Low', 'Medium', 'High').optional(),
    status: Joi.string().valid(
      'Pending',
      'To Do',
      'In Progress',
      'Completed',
      'Tested',
      'Done'
    ).optional(),
    description: Joi.string().optional().min(1).max(200),
  }),
};

