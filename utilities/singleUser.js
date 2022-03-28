const {tidy, count} = require('@tidyjs/tidy')
//these functions assemble data from raw sqlize query

module.exports = {
  topChannel,
  topWord,
  topReaction,
  hottestMessage
}

//finds the channel with the most messages for a user
// takes in array of all messages
// finds all channels associated with user, then the most common channelId
//returns that channelID
function topChannel(messages, userId) {
  let userMessages = messages.filter(message => message.userId = userId)
  try {
    let channelCount = tidy(userMessages, count('channelId', {sort:true}))
    return channelCount[0].channelId
  }
  catch(err) {
    throw new Error('top Channel Error')
  }
}
function topWord(messages, userId) {
  let userMessages = messages.filter(message => message.userId = userId)
  let messageContent = userMessages.map(message => message.content)

  let words = {}
  for (let message in messageContent) {
    for (let word in message) {
      if (word in words)
        words[word] += 1
      else
        words[word] = 1;
    }
  }

  let topWordCount = 0
  let topWord = "asdf"
  for (let [key, value] of Object.entries(words)) {
    if (key.length > 2 && value > topWordCount) {
      topWordCount = value
      topWord = key;
    }
  }
  return topWord
}

function topReaction(reactions, userId) {
  let userReactions = reactions.filter(reaction => reaction.authorId = userId)
  let reactionCount = tidy(userReactions, count('emojiName', {sort: true}))
  return reactionCount[0].emojiId

}

function hottestMessage(reactions, messages, userId) {
  let userReactions = reactions.filter(reaction => reaction.authorId = userId)
  let reactionCount = tidy(userReactions, count('messageId', {sort: true}))

  let hottestMessageId = reactionCount[0].hottestMessageId

  for(let message of messages) {
    if (message.id === hottestMessageId)
      return message.content
  }

}

