const {tidy, count, filter} = require('@tidyjs/tidy')
//these functions assemble data from raw sqlize query

module.exports = {
  topChannel
}

//finds the channel with the most messages for a user
// takes in array of all messages
// finds all channels associated with user, then the most common channelId
//returns that channelID
function topChannel(messages, userId) {
  let userMessages = tidy(messages, filter((message) => message.userId = userId))
  try {
    let channelCount = tidy(userMessages, count('channelId', {sort:true}))
    return channelCount[0].channelId
  }
  catch(err) {
    throw new Error('top Channel Error')
  }
}

function topWord(messages, userId) {
  let userMessages = tidy(messages, filter((message) => message.userId = userId))
  try {

  } catch (error) {

  }
}

