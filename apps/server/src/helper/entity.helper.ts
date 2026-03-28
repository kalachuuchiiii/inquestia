import { getNextPage } from "@/utils/getNextPage";
import { QueryParam } from "@inquestia/schemas";
import { Document, Model, FilterQuery, Query } from "mongoose";

type GetListOfResourceProps<T> = {
  filterQuery: FilterQuery<T>;
  query: Query<DocumentType[], DocumentType, {}, DocumentType>;
  page: number;
  limit: number;
};

export class EntityHelper<T> {
  constructor(public Entity: Model<T>) {}

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
    const nextPage = getNextPage({ page, limit, totalResources });
    return {
      resourceList,
      totalResources,
      nextPage,
    };
  };
}
