const grabUsers = async (cMessages) => {
  const users = {}

  cMessages.forEach(message => {
    if(users[message.authorId]){
      users[message.authorId] += 1
    } else {
      users[message.authorId] = 1
    }
  })

  const activeUsers = Object.keys(users).length

  return {activeUsers}
}

module.exports = grabUsers
