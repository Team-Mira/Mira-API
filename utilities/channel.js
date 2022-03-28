function timeSpread(messages, channelId) {
  let channelMessages = messages.filter(message => message.channelId = channelId)

  let timeArray = new Array(24);
  for (messages in channelMessages) {
    timeArray[messages.createdAt.getHours()]++
  }

  return timeArray;
}

module.exports = timeSpread
