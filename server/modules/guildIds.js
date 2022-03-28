const client = require('../../bot')

async function guildIds(){

  const ids = []

  client.guilds.cache.map(guild => {ids.push(guild.id)})

  return ids
}

module.exports = guildIds
