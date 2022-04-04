const client = require('../client')
const { message, reaction, mention } = require('../server/db/models')
const grabChannels = require('./grabChannels')
const grabMessages = require('./grabMessages')
const grabActiveUsers = require('./grabActiveUsers')
const grabUsers = require('./grabUsers')
const grabWordCount = require('./grabWordCount')

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
  const cUsers = await grabUsers(cGuild)
  const { totalMessages, totalReactions, totalReplies } = await grabMessages(cMessages, cReactions)
  const activeUsers = await grabActiveUsers(cMessages)

  const cData = {
    name: cGuild.name,
    id: cGuild.id,
    icon: cGuild.iconURL(),
    totalMessages,
    totalReactions,
    totalReplies,
    activeUsers,
    wordCloud: grabWordCount(cMessages),
    users: cUsers,
    channels: grabChannels(cGuild, cMessages),
    mostActiveUser: mostActiveUser(cMessages) ,
    mostActiveReactor: mostActiveReactor(cReactions) ,
    mostUsedReaction: mostUsedReaction(cReactions) ,
    townGossip: townGossip(cMentions) ,
    updateUserGraph: updateUserGraph(cMessages, cMentions, cReactions, cUsers),
    mostIgnoredUser: mostIgnoredUser(cMessages),
    mostLongWinded: mostLongWinded(cMessages)

  }

  return cData
}

module.exports = dataCompiler
