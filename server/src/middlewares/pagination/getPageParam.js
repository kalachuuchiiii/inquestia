const { limit } = require('../../data/limit.js')

exports.getPageParam = async (req, res, next) => {
  if (isNaN(req.query?.page)) {
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

  req.paginationParams = { skip, limit, sort, page };

  next()
}