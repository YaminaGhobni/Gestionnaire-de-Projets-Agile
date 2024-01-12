import Notification, { NotificationModel } from '../../model/Notification';

const findByObj = (obj: object): Promise<Notification | null> => {
  return NotificationModel.findOne(obj).exec();
};

export default findByObj;
