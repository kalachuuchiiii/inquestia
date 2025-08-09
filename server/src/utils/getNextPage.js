exports.getNextPage = (total, page, limit) => {
  const hasNextPage = page * limit < total;
  return hasNextPage ? page + 1 : null;
};