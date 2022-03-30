const tempGrabUsers = async (guild) => {
  const users = guild.members.cache

  const cUsers = {}

  users.map(gm => {
    if(!gm.user.bot){
      cUsers[gm.user.id] = {
        name: gm.nickname || gm.user.username,
        avatar: gm.displayAvatarURL()
      }
    }
  })

  return cUsers
}

module.exports = tempGrabUsers
