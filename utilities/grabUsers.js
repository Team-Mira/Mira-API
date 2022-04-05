const colorCreator = require('./colorCreator')

const grabUsers = async (client, type) => {
  let users
  if(type === 'channel'){
    users = client.members
  }else{
    users = client.members.cache
  }

  console.log(users)

  const cUsers = {}

  users.map(gm => {
    if(!gm.user.bot){
      cUsers[gm.user.id] = {
        id: gm.user.id,
        title: gm.nickname || gm.user.username,
        label: gm.nickname || gm.user.username,
        image: gm.displayAvatarURL(),
        color: colorCreator(gm.user.id).border,
        font: {color: '#FFFFFF'}
      }
    }
  })

  return cUsers
}

module.exports = grabUsers
