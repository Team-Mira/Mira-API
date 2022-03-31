const client = require('../client')
const { message, reaction, mention } = require('../server/db/models')

const {
    topChannel,
    wordCount,
    topReaction,
    hottestMessage
  } = require('./singleUser')


  async function userCompiler(authorId) {
    const user = await client.users.fetch(authorId)

    const userMessages = await message.findAll({where: {authorId: authorId}, include: ['reactions']})
    const userReactions = userMessages.flatMap(message => message.reactions)

  return {
        id: authorId,
        name: user.username,
        avatar: user.avatarURL(),
        topChannel: topChannel(userMessages),
        wordCount: wordCount(userMessages),
        topReaction: topReaction(userReactions),
        hottestMessage: hottestMessage(userMessages)
    }
  }

  module.exports = userCompiler
