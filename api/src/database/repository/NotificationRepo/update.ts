import Notification, { NotificationModel } from '../../model/Notification';

const update = async (
  id: string,
  obj: Partial<Notification>
): Promise<Notification | null> => {
  return await NotificationModel.findByIdAndUpdate(
    id,
    { $set: { ...obj } },
    { new: true }
  ).exec();
};

export default update;
