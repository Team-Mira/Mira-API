const client = require('../bot')
const { message, reaction, mention } = require('../server/db/models')

const {
    topChannel,
    wordCount,
    topReaction,
    hottestMessage
  } = require('./singleUser')

  
  async function userCompiler(authorId) {
    const userMessages = await message.findAll({where: {authorId: authorId}, include: ['reactions']})
    userReactions = userMessages.flatMap(message => message.reactions)
  return {
        id: authorId,
        topChannel: topChannel(userMessages),
        wordCount: wordCount(userMessages),
        topReaction: topReaction(userReactions),
        hottestMessage: hottestMessage(userMessages)
    }
  }
  
  module.exports = userCompiler