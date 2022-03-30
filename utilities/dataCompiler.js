const client = require('../bot')
const { message, reaction, mention } = require('../server/db/models')
const grabChannels = require('./grabChannels')
const grabMessages = require('./grabMessages')
const grabUsers = require('./grabUsers')
const tempGrabUsers = require('./tempGrabUsers')

const {
  mostActiveUser,
  mostActiveReactor,
  mostUsedReaction,
  mostIgnoredUser,
  mostLongWinded,
  townGossip,
} = require('./users');
const { updateUserGraph } = require('./pairs');

const dataCompiler = async (guildId) => {
  const cGuild = await client.guilds.fetch(guildId)
  const cMessages = await message.findAll({where: {guildId}, include: ['reactions', 'mentions']})
  const cMentions = cMessages.flatMap(message => message.mentions)
  const cReactions = cMessages.flatMap(message => message.reactions)
  const cUsers = await tempGrabUsers(cGuild)
  const { totalMessages, totalReactions, totalReplies } = await grabMessages(cMessages, cReactions)
  const { activeUsers } = await grabUsers(cMessages)

  const cData = {
    name: cGuild.name,
    id: cGuild.id,
    icon: cGuild.iconURL(),
    totalMessages,
    totalReactions,
    totalReplies,
    activeUsers,
    users: cUsers,
    channels: grabChannels(cGuild, cMessages),
    // mostActiveUser: mostActiveUser(cMessages) ,
    // mosActiveReactor: mostActiveReactor(cReactions) ,
    // mostUsedReaction: mostUsedReaction(cReactions) ,
    // townGossip: townGossip(cMentions) ,
    updateUserGraph: updateUserGraph(cMessages, cMentions, cReactions),
    // mostIgnoredUser: mostIgnoredUser(cMessages),
    // mostLongWinded: mostLongWinded(cMessages)

  }

  return cData
}

module.exports = dataCompiler
