const client = require('../bot')
const { message } = require('../server/db/models')

const mostMessagesGuild = async (guildId) => {
  const cGuild = await client.guilds.fetch(guildId)

  const cMessages = await message.findAll({where: {guildId}})

  const mostMessages = []

  cGuild.channels.cache.map(
    channel => {
      if(channel.type === 'GUILD_TEXT'){
        mostMessages.push({channelName: channel.name, channelId: channel.id})
      }
    }
  )

  for(let i = 0; i < mostMessages.length; i++){
    const totalMessages = cMessages.filter(
      e => e.channelId === mostMessages[i].channelId).length
    mostMessages[i].totalMessages = totalMessages
  }

  return mostMessages
}

module.exports = mostMessagesGuild
