import { QueryParam } from "@inquestia/schemas";


export const  getNextPage = ({
    page,
    limit,
    totalResources,
  }: Pick<QueryParam, 'page' | 'limit'> & { totalResources: number }) => {
    const nextPage = page * limit < totalResources ? page + 1 : null;
    return nextPage;
  };