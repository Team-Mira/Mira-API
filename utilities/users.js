const {tidy, count} = require('@tidyjs/tidy') 
//these functions assemble data from raw sqlize query

module.exports = {
    highestMessageUser
}

//calculate user with the most messages
//takes array of messages, returns userId
function highestMessageUser(messages) {
    let authorCount = tidy(messages, count('userId', {sort:true}))
    return authorCount[0]
}

