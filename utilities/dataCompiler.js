const client = require('../bot')
const { message, reaction } = require('../server/db/models')
const grabChannels = require('./grabChannels')
const grabMessages = require('./grabMessages')
const grabUsers = require('./grabUsers')

const dataCompiler = async (guildId) => {
  const cGuild = await client.guilds.fetch(guildId)
  const cMessages = await message.findAll({where: {guildId}})
  const cReaction = await reaction.findAll()
  const { totalMessages, totalReactions, totalReplies } = await grabMessages(cMessages, cReaction)
  const { activeUsers } = await grabUsers(cMessages)

  const cData = {
    name: cGuild.name,
    id: cGuild.id,
    totalMessages,
    totalReactions,
    totalReplies,
    activeUsers,
    channels: grabChannels(cGuild, cMessages)
  }

  return cData
}

module.exports = dataCompiler
