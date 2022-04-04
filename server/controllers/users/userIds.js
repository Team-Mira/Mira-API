const client = require('../../../client')

async function userIds(){
  const ids = client.users.cache.map(user => (user.id))
  return ids
}

module.exports = userIds
