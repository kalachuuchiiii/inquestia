const { limit } = require('../../data/limit.js')

exports.getPageParam = async (req, res, next) => {
  if (isNaN(parseInt(req?.query?.page || "1"))) {
    return res.status(400).json({
      success: false,
      message: 'Page is not a number'
    })
  }
  const page = parseInt(req.query.page);
  const sort = parseInt(req?.query?.sort || 1)
  const skip = (page - 1) * limit;

  if (sort !== 1 && sort !== -1) {
    return res.status(400).json({
      success: false,
      message: "Invalid sorting."
    })
  }
  
  req.getNextPage = (total) => {
    const hasNextPage = page * limit < total;
    return hasNextPage ? page + 1 : null;
  }

  req.paginationParams = { skip, limit, sort, page };

  next()
}