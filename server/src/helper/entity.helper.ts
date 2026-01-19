import { QueryParam } from "@shared/schemas";
import { Document, Model, FilterQuery, Query } from "mongoose";

type GetListOfResourceProps<T> = {
  filterQuery: FilterQuery<T>;
  query: Query<DocumentType[], DocumentType, {}, DocumentType>;
  page: number;
  limit: number;
};

export class EntityHelper<T> {
  constructor(public Entity: Model<T>) {}

  getNextPage = ({
    page,
    limit,
    totalResources,
  }: Pick<QueryParam, 'page' | 'limit'> & { totalResources: number }) => {
    const nextPage = page * limit < totalResources ? page + 1 : null;
    return nextPage;
  };

  getListOfResource = async ({
    filterQuery,
    query,
    page,
    limit,
  }: GetListOfResourceProps<T>) => {
    const [resourceList, totalResources] = await Promise.all([
      query,
      this.Entity.countDocuments(filterQuery),
    ]);
    const nextPage = this.getNextPage({ page, limit, totalResources });
    return {
      resourceList,
      totalResources,
      nextPage,
    };
  };
}
