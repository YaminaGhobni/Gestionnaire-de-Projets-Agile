import Meeting, { MeetingModel } from '../../model/Meeting';

const remove = async (id: string): Promise<Meeting | null> => {
  return await MeetingModel.findByIdAndUpdate(
    id,
    { $set: { deletedAt: Date.now() } },
    { new: true }
  ).exec();
};

export default remove;
