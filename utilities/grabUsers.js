const colorCreator = require('./colorCreator')

const grabUsers = async (guild) => {
  const users = guild.members.cache

  const cUsers = {}

  users.map(gm => {
    if(!gm.user.bot){
      cUsers[gm.user.id] = {
        id: gm.user.id,
        title: gm.nickname || gm.user.username,
        image: gm.displayAvatarURL(),
        color: colorCreator(gm.user.id).border
      }
    }
  })

  return cUsers
}

module.exports = grabUsers
