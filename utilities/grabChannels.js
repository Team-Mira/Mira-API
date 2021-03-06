const colorCreator = require('./colorCreator')

const grabChannels = (cGuild, cMessages) => {
  const channels = []

  cGuild.channels.cache.map(
    channel => {
      if(channel.type === 'GUILD_TEXT' && channel.viewable){
        channels.push({name: channel.name, id: channel.id, colors: colorCreator(channel.id)})
      }
    }
  )

  for(let i = 0; i < channels.length; i++){
    const activity = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    const totalMessages = cMessages.filter(
      message => message.channelId === channels[i].id)

    totalMessages.map(message => {
      const date = new Date(Date.parse(message.createdAt))
      const hour = date.getUTCHours() - 5
      const estHour = hour < 0 ? hour + 23 : hour


      activity[estHour] = activity[estHour] + 1
    })

    channels[i].totalMessages = totalMessages.length
    channels[i].activity = activity
  }

  return channels
}

module.exports = grabChannels
