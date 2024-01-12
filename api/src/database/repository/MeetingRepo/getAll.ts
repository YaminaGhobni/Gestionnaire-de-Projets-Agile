import Meeting, { MeetingModel } from '../../model/Meeting';
import { PaginationModel } from 'mongoose-paginate-ts';
import APIFeatures from '../../../helpers/apiFeatures';
import { ApiOptions } from 'app-request';

type pagingObj = {
  limit: number;
  page: number;
};

const findAll = async (
  paging: pagingObj,
  query: object,
  apiOptions: ApiOptions
): Promise<PaginationModel<Meeting>> => {
  let findAllQuery = apiOptions.deleted
    ? MeetingModel.find({ deletedAt: { $ne: null } })
    : MeetingModel.find({ deletedAt: null });

  const features = new APIFeatures(findAllQuery, query)
    .filter()
    .sort()
    .limitFields()
    .search(['name']);

  const options = {
    query: features.query,
    limit: paging.limit ? paging.limit : null,
    page: paging.page ? paging.page : null,
  };

  return (await MeetingModel.paginate(options)) as PaginationModel<Meeting>;
};

export default findAll;
