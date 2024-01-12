import Meeting, { MeetingModel } from '../../model/Meeting';

const update = async (id: string, obj: Partial<Meeting>): Promise<Meeting | null> => {
  return await MeetingModel.findByIdAndUpdate(
    id,
    { $set: { ...obj } },
    { new: true }
  ).exec();
};

export default update;
