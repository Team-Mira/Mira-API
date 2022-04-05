const { tidy, count, max, groupBy, rate, mutate } = require('@tidyjs/tidy');
const { message, mention, reaction } = require('../server/db');

//these functions assemble data from raw sqlize query

module.exports = {
  mostActiveUser,
  mostActiveReactor,
  mostUsedReaction,
  mostIgnoredUser,
  mostLongWinded,
  townGossip
};

//calculate user with the most messages
//takes array of messages, computes sorted list of users by messages, returns userId
//ties result in 'first come first serve' (earlier in messages array)
function mostActiveUser(messages) {
  try {
    if(!messages.length){
      return null
    }
    let authorCount = tidy(messages, count('authorId', { sort: true }));
    return authorCount.slice(0,5).map(rank => ({key: rank.authorId, value: rank.n}));
  } catch (error) {
    throw new Error('Message Object Empty');
  }
}

//returns user who has reacted the most
//takes array of reactions, computes sorted list of users by reactions, returns userId
function mostActiveReactor(reactions) {
  try {
    if(!reactions.length){
      return null
    }
    let reactionCount = tidy(reactions, count('reactorId', { sort: true }));
    return reactionCount.slice(0,5).map(rank => ({key: rank.reactorId, value: rank.n}));
  } catch (error) {
    throw new Error('Reaction Object Empty');
  }
}

//returns most used emoji id
//takes array of reactions, computes sorted list of emojiIds by use, returns emojiId
function mostUsedReaction(reactions) {
  try {
    if(!reactions.length){
      return null
    }
    const reactionCount = {}

    reactions.forEach(reaction => {
      if(reactionCount[reaction.emojiName]){
        reactionCount[reaction.emojiName].value = reactionCount[reaction.emojiName].value + 1
      } else {
        reactionCount[reaction.emojiName] = {
          value: 1, url: reaction.url, key: reaction.emojiName
        }
      }
    })

    const cReactions = Object.values(reactionCount).sort((a, b) => {
      a.value - b.value
    })

    return cReactions
    // {key: rank.emojiName, value: rank.n}
  } catch (error) {
    throw new Error('Reaction Object Empty');
  }
}

function mostIgnoredUser(messagesWithReactions) {
  try {
    if(!messagesWithReactions.length){
      return null
    }
    let authorMessages = tidy(
      messagesWithReactions,
      groupBy('authorId', groupBy.entriesObject())
    ); //groups messages by user
    authorMessages = authorMessages.map((user) => {
      let reactionsTally = user.values.flatMap(
        (message) => message.reactions
      ).length; //tallies all reactions
      let reactionMessageRatio = reactionsTally / user.values.length;
      return {... user, reactionMessageRatio: reactionMessageRatio};
    });
    authorMessages.sort(
      (a, b) => a.reactionMessageRatio < b.reactionMessageRatio
    );
    return authorMessages.slice(0,5).map(rank => ({key: rank.key, value: rank.reactionMessageRatio}));
  } catch (error) {
    throw error;
  }
}

function mostLongWinded(messages) {
  try {
    if(!messages.length){
      return null
    }
    let authorMessages = tidy(
      messages,
      groupBy('authorId', groupBy.entriesObject())
    );
    authorMessages = authorMessages.map(collection => {

      let wordCount = collection.values.reduce((count, msg) => {

        if(msg.dataValues.content === undefined) {
          return count
        }
       return msg.dataValues.content.split(' ').length + count}, 0)

      let avgLength = wordCount / collection.values.length
      return {...collection, avgLength: avgLength}
    })
    authorMessages.sort((a, b) => a.avgLength > b.avgLength)
    return authorMessages.slice(0,5).map(rank=> ({key: rank.key, value: rank.avgLength}))
  } catch (error) {
    throw error;
  }
}

function townGossip(mentions) {
  try {
    if(!mentions.length){
      return null
    }
    const mentionsByAuthor = tidy(mentions, count('authorId', {sort:true}))
    return mentionsByAuthor.slice(0,5).map(rank=> ({key: rank.authorId, value: rank.n}))
  } catch(error) {
    throw(error)
  }
}

