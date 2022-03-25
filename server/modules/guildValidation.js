const client = require('../../bot')

async function guildValidation(userId, guildId){

  return client.guilds.cache.find(
    guild => guild.id === '953680127726866442')
    .members.cache.has('393621989983780876')
}

module.exports = guildValidation
