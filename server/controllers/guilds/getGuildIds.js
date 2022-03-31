const client = require('../../../client')
const ApiError = require('../../errors/ApiError')

const getGuildIds = async (req, res, next) => {
  let ids

  try{
    ids = client.guilds.cache.map(guild => (guild.id))
  } catch(err){
    next(ApiError.internal('Error Fetching IDs'))
    return
  }

  res.send(ids)
}

module.exports = getGuildIds
