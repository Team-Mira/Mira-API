const getReactions = (id, cReaction) => {
  return cReaction.filter(reaction => reaction.messageId === id).length
}

const grabMessages = async (cMessages, cReaction) => {
  const totalMessages = cMessages.length
  let totalReactions = 0
  let totalReplies = 0

  await cMessages.forEach(async (message) => {
    totalReactions += getReactions(message.id, cReaction)
    if(message.isReply){
      totalReplies += 1
    }
  })

  return {totalMessages, totalReactions, totalReplies}
}

module.exports = grabMessages
