import Meeting, { MeetingModel } from '../../model/Meeting';

const create = async (obj: Meeting): Promise<Meeting> => {
  return await MeetingModel.create(obj);
};

export default create;
