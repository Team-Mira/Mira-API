const {tidy, count, max, summarize} = require('@tidyjs/tidy') 
const {reaction} = require('./db')
//these functions assemble data from raw sqlize query

module.exports = {
    mostActiveUser,
    mostActiveReactor,
    mostUsedReaction,
}

//calculate user with the most messages
//takes array of messages, computes sorted list of users by messages, returns userId
//ties result in 'first come first serve' (earlier in messages array) 
function mostActiveUser(messages) {
   try{
       let authorCount = tidy(messages, count('userId', {sort:true}))
     return authorCount[0].userId} 
   catch(error){
       throw new Error('Message Object Empty')
   }
}

//returns user who has reacted the most
//takes array of reactions, computes sorted list of users by reactions, returns userId
function mostActiveReactor(reactions) {
    try{
        let reactionCount = tidy(reactions, count('reactorId', {sort:true}))
        return reactionCount[0].reactorId
    } catch(error){
        throw new Error('Reaction Object Empty')
    }
}

//returns most used emoji id
//takes array of reactions, computes sorted list of emojiIds by use, returns emojiId
function mostUsedReaction(reactions) {
    try{
        let reactionCount = tidy(reactions, count('emojiId', {sort:true}))
        return reactionCount[0].emojiId
    } catch(error){
        throw new Error('Reaction Object Empty')
    }
}

function mostIgnoredUser(messages) {
    try{
        let authorMessages = tidy(messages, groupBy('userId')) //groups messages by user
        let authorMessagesWithReactions = authorMessages.map(collection => {
            let reactions = reaction.findAll({where: {reactorId: collection[0].userId}})
            return {...collection, reactions}})//counts total reactions to user messages
        return tidy(authorMessagesWithReactions, summarize({ userId: max(collection=>collection.messages.length / collection.reactions.length)})//sorts collections by ratio of messages to reactions
    }catch(error){
        throw new Error('Message Object Empty')
    }
}