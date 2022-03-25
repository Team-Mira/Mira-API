const client = require('../../bot')

async function guildValidation(userId, guildId){

  return client.guilds.cache.find(
    guild => guild.id === guildId)
    .members.cache.has(userId)
}

module.exports = guildValidation
