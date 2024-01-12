import Meeting, { MeetingModel } from "../../model/Meeting";

const findById = (id: string): Promise<Meeting | null> => {
  return MeetingModel.findById(id).populate({ path: "members" }).exec();
};

export default findById;
