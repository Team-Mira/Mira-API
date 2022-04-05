const client = require('../../../client')
const ApiError = require('../../errors/ApiError')

const getChannelIds = async (req, res, next) => {
  let ids

  try{
    ids = client.channels.cache.map(channel => {
      if(channel.type !== 'GUILD_TEXT')
      return channel.id
    })
  } catch(err){
    next(ApiError.internal('Error Fetching IDs'))
    return
  }

  res.send(ids.filter(id => id))
}

module.exports = getChannelIds
