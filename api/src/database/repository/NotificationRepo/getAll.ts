import Notification, { NotificationModel } from '../../model/Notification';
import { PaginationModel } from 'mongoose-paginate-ts';
import APIFeatures from '../../../helpers/apiFeatures';

type pagingObj = {
  limit: number;
  page: number;
};

const findAll = async (
  paging: pagingObj,
  query: object,
  userId: string
): Promise<PaginationModel<Notification>> => {
  let findAllQuery = NotificationModel.find({ deletedAt: null, userId });

  const features = new APIFeatures(findAllQuery, query)
    .filter()
    .sort()
    .limitFields()
    .search([])
    .recherche('id');

  const options = {
    query: features.query,
    limit: paging.limit ? paging.limit : null,
    page: paging.page ? paging.page : null,
  };

  return (await NotificationModel.paginate(
    options
  )) as PaginationModel<Notification>;
};

export default findAll;
