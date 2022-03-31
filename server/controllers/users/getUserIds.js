const client = require('../../../client')
const ApiError = require('../../errors/ApiError')

const getUserIds = async (req, res, next) => {
  let ids

  try{
    ids = client.users.cache.map(user => (user.id))
  }catch(err){
    next(ApiError.badRequest('No User ID Recieved'))
    return
  }

  res.send(ids)
}

module.exports = getUserIds
