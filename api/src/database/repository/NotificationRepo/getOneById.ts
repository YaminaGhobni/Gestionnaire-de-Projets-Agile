import Notification, { NotificationModel } from '../../model/Notification';

const findById = (id: string): Promise<Notification | null> => {
  return NotificationModel.findById(id).exec();
};

export default findById;
