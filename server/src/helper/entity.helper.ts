import { Document, Model, FilterQuery, Query } from "mongoose";

type GetListOfResourceProps<T> = {
  filterQuery: FilterQuery<T>;
  query: Query<DocumentType[], DocumentType, {}, DocumentType>;
  page: number;
  limit: number;
};

export class EntityHelper<T extends Document> {
  constructor(public Entity: Model<T>) {}

  getListOfResource = async ({
    filterQuery,
    query,
    page,
    limit,
  }: GetListOfResourceProps<T>) => {
    const [resourceList, totalResource] = await Promise.all([
      query,
      this.Entity.countDocuments(filterQuery),
    ]);
    const nextPage = page * limit < totalResource ? page + 1 : null;

    return {
      resourceList,
      totalResource,
      nextPage,
    };
  };
}
