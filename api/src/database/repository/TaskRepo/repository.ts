import  { TaskModel } from '../../model/Task';

const create = async (taskObj: any): Promise<any> => {
  return await TaskModel.create(taskObj);
};

const getById = async (taskId: string): Promise<any | null> => {
  return await TaskModel.findById(taskId).exec();
};

const update = async (taskId: string, updateObj: Partial<any>): Promise<any | null> => {
  return await TaskModel.findByIdAndUpdate(taskId, updateObj, { new: true }).exec();
};

const remove = async (taskId: string): Promise<any | null> => {
  return await TaskModel.findByIdAndRemove(taskId).exec();
};

const getAll = async (): Promise<any[]> => {
    return await TaskModel.find({}).exec();
};
export default {
  create,
  getById,
  update,
  remove,
  getAll
};
