const client = require('../../../client')
const ApiError = require('../../errors/ApiError')

const guildValidation = async (req, res, next) => {
  const { guildId } = req.params
  const { userId } = req.headers
  let hasAccess

  try{
    hasAccess = client.guilds.cache.find(
      guild => guild.id === guildId)
      .members.cache.has(userId)
  } catch(err){
    next(ApiError.internal('Error Verifying User'))
    return
  }

  res.send(hasAccess)
}

module.exports = guildValidation
