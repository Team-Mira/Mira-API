const client = require('../../../client')
const ApiError = require('../../errors/ApiError')

const getUserGuilds = async (req, res, next) => {
  const id = req.params.userId
  let cGuilds

  if(!id){
    next(ApiError.badRequest('No User ID Recieved'))
    return
  }

  try{
    cGuilds = client.guilds.cache.map(guild => {
      if(guild.members.cache.has(id)){
        const channels = guild.channels.cache.filter(
          channel => {
            if(channel.members.has(id)){
              return {id: channel.id, name: channel.name, type: channel.type}
            }
          })
        return {id: guild.id, name: guild.name, members: guild.memberCount, channels }
      }
    })
  }catch(err){
    console.log(err)
    next(ApiError.internal('Error Fetching Users Guilds'))
    return
  }

  res.send(cGuilds.filter(guild => guild))
}

module.exports = getUserGuilds
