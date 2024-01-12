import Task, { TaskModel } from '../../model/Task';

const create = async (taskObj: Task): Promise<Task> => {
  return await TaskModel.create(taskObj);
};

const getById = async (taskId: string): Promise<Task | null> => {
  return await TaskModel.findById(taskId).exec();
};

const update = async (taskId: string, updateObj: Partial<Task>): Promise<Task | null> => {
  return await TaskModel.findByIdAndUpdate(taskId, updateObj, { new: true }).exec();
};

const remove = async (taskId: string): Promise<Task | null> => {
  return await TaskModel.findByIdAndRemove(taskId).exec();
};

const getAll = async (): Promise<Task[]> => {
    return await TaskModel.find({}).exec();
};
export default {
  create,
  getById,
  update,
  remove,
  getAll
};
