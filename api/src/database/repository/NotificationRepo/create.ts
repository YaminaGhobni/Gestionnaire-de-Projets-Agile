import Notification, { NotificationModel } from '../../model/Notification';

const create = async (obj: Partial<Notification>): Promise<Notification> => {
  return await NotificationModel.create(obj);
};

export default create;
