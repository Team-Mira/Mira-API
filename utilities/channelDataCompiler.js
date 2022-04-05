const client = require('../client')
const { message } = require('../server/db/models')
const grabMessages = require('./grabMessages')
const grabActiveUsers = require('./grabActiveUsers')
const grabUsers = require('./grabUsers')
const grabWordCount = require('./grabWordCount')
const grabChannelMessages = require('./grabChannelMessages')
const colorCreator = require('./colorCreator')

const {
  mostActiveUser,
  mostActiveReactor,
  mostUsedReaction,
  mostIgnoredUser,
  mostLongWinded,
  townGossip,
} = require('./users');
const { updateUserGraph } = require('./pairs');

const dataCompiler = async (channelId) => {
  //Make a better method later
  const cChannelTemp = await client.channels.fetch(channelId)
  const cGuild = await client.guilds.fetch(cChannelTemp.guildId)
  const cChannel = await cGuild.channels.fetch(channelId)
  const cMessages = await message.findAll({where: {channelId}, include: ['reactions', 'mentions']})
  const cMentions = cMessages.flatMap(message => message.mentions)

  const cReactions = (cMessages.flatMap(message => message.reactions)).map((reaction) => {
    if(reaction.emojiId){
      reaction.url = `https://cdn.discordapp.com/emojis/${reaction.emojiId}`
    } else {
      reaction.url = null
    }
    return reaction
  })

  const cUsers = await grabUsers(cChannel, 'channel')
  const { totalMessages, totalReactions, totalReplies } = await grabMessages(cMessages, cReactions)
  const activeUsers = await grabActiveUsers(cMessages)
  const activity = grabChannelMessages(cMessages)


  const cData = {
    guildName: cGuild.name,
    name: cChannel.name,
    id: cChannel.id,
    activity,
    totalMessages,
    totalReactions,
    totalReplies,
    activeUsers,
    wordCloud: grabWordCount(cMessages),
    users: cUsers,
    mostActiveUser: mostActiveUser(cMessages) ,
    mostActiveReactor: mostActiveReactor(cReactions) ,
    mostUsedReaction: mostUsedReaction(cReactions) ,
    townGossip: townGossip(cMentions) ,
    updateUserGraph: updateUserGraph(cMessages, cMentions, cReactions, cUsers),
    mostIgnoredUser: mostIgnoredUser(cMessages),
    mostLongWinded: mostLongWinded(cMessages),
    colors: colorCreator(channelId)

  }

  return cData
}

module.exports = dataCompiler
