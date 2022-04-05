const grabChannelMessages = (messages) => {
  const activity = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  messages.map(message => {
    const date = new Date(Date.parse(message.createdAt))
    const hour = date.getUTCHours() - 5
    const estHour = hour < 0 ? hour + 23 : hour

    activity[estHour] = activity[estHour] + 1
  })
    return activity
}


module.exports = grabChannelMessages
