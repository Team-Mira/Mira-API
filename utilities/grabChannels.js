
const grabChannels = (cGuild, cMessages) => {
  const channels = []

  cGuild.channels.cache.map(
    channel => {
      if(channel.type === 'GUILD_TEXT'){
        channels.push({name: channel.name, id: channel.id,})
      }
    }
  )

  for(let i = 0; i < channels.length; i++){
    const activity = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    const totalMessages = cMessages.filter(
      message => message.channelId === channels[i].id)

    totalMessages.map(message => {
      const date = new Date(Date.parse(message.createdAt))
      const hour = date.getHours()
      activity[hour] = activity[hour] + 1
    })

    channels[i].totalMessages = totalMessages.length
    channels[i].activity = activity
  }

  return channels
}

module.exports = grabChannels
