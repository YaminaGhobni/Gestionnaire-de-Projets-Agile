import Notification, { NotificationModel } from '../../model/Notification';

const remove = async (id: string): Promise<Notification | null> => {
  return await NotificationModel.findByIdAndUpdate(
    id,
    { $set: { deletedAt: Date.now() } },
    { new: true }
  ).exec();
};

export default remove;
