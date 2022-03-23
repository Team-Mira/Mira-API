const client = require('../../bot')

async function guildsSearch(id){
  const cGuilds = client.guilds.cache.map(guild => {
    if(guild.members.cache.has(id)){

      // be sure to verify is user can see the channel
      const channels = guild.channels.cache.map(channel => {return {id: channel.id, name: channel.name}})

      return {id: guild.id, name: guild.name, channels }
    }
  })

  return cGuilds
}

module.exports = guildsSearch
