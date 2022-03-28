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
function topChannel(userMessages) {
  try {
    let channelCount = tidy(userMessages, count('channelId', {sort:true}))
    return channelCount[0].channelId
  }
  catch(err) {
    throw new Error('top Channel Error')
  }
}
function topWord(userMessages) {
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

function topReaction(userReactions) {
  let reactionCount = tidy(userReactions, count('emojiName', {sort: true}))
  return reactionCount

}

function hottestMessage(userMessages) {
  let reactionCount = tidy(userMessages, count('reactions', {sort: true}))
  return reactionCount[0].content

}

