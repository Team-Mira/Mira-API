const client = require('../bot')
const { message, reaction, mention } = require('../server/db/models')
const grabChannels = require('./grabChannels')
const grabMessages = require('./grabMessages')
const grabUsers = require('./grabUsers')

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
  const { totalMessages, totalReactions, totalReplies } = await grabMessages(cMessages, cReactions)
  const { activeUsers } = await grabUsers(cMessages)

  const cData = {
    name: cGuild.name,
    id: cGuild.id,
    totalMessages,
    totalReactions,
    totalReplies,
    activeUsers,
    channels: grabChannels(cGuild, cMessages),
    // mostActiveUser: mostActiveUser(cMessages) ,
    // mosActiveReactor: mostActiveReactor(cReactions) ,
    // mostUsedReaction: mostUsedReaction(cReactions) ,
    // townGossip: townGossip(cMentions) ,
    // updateUserGraph: updateUserGraph(cMessages, cMentions, cReactions),
    // mostIgnoredUser: mostIgnoredUser(cMessages),
    // mostLongWinded: mostLongWinded(cMessages)

  }

  return cData
}

module.exports = dataCompiler
