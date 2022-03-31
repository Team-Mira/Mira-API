const ApiError = require('./ApiError')

function apiErrorHandler(err, req, res, next) {
  // get a logger before production
  console.error(err)

  if (err instanceof ApiError) {
    res.status(err.code).json(err.message)
    return
  }

  res.status(500).json('Unknown error occured')
}

module.exports = apiErrorHandler
