const { limit } = require('../../data/limit.js')

exports.getPageParam = async(req, res, next) => {
  if(isNaN(req.query?.page)){
    return res.status(400).json({
      success: false,
      message: 'Skip is not a number'
    })
  }
  const page = parseInt(req.query.page)
  const skip = (page - 1) * limit;
  
  req.paginationParams = { skip, limit, page };
  
  next()
}