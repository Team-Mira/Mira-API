const {tidy, count, mutate} = require('@tidyjs/tidy')
//these functions assemble data from raw sqlize query

module.exports = {
  topChannel,
  wordCount,
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
function wordCount(userMessages) {
  let messageContent = userMessages.map(message => message.content)
  let words = {}
  for (let message of messageContent) {
    wordArr = message.split(' ')
    for (let word of wordArr) {
      if (word in words)
        words[word] += 1
      else
        words[word] = 1;
    }
  }

  let topWord = Object.keys(words).reduce((a, b) => words[a] > words[b] ? a : b);
  return topWord
}

function topReaction(userReactions) {
  let reactionCount = tidy(userReactions, count('emojiName', {sort: true}))
  return reactionCount[0].emojiName

}

function hottestMessage(userMessages) {
  let reactionCount = tidy(userMessages, mutate(count('reactions', {sort: true})))
  return reactionCount[0].content

}

