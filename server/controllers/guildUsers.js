const client = require('../../bot')

async function guildUsers(guildId){
  const cGuild = await client.guilds.fetch(guildId)
  let cGuildUsers = await cGuild.members.fetch()
  cGuildUsers = cGuildUsers.filter((value) => value.user.bot === false)

  return cGuildUsers.keys()
}

module.exports = guildUsers
