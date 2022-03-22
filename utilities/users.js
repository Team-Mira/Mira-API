const {tidy, count} = require('@tidyjs/tidy') 
//these functions assemble data from raw sqlize query

module.exports = {
    highestMessageUser
}

//calculate user with the most messages
//takes array of messages, computes sorted list of users by messages, returns userId
//ties result in 'first come first serve' (earlier in messages array) 
function highestMessageUser(messages) {
   try{
       let authorCount = tidy(messages, count('userId', {sort:true}))
     return authorCount[0].userId} 
   catch(error){
       throw new Error('Message Object Empty')
   }
}

