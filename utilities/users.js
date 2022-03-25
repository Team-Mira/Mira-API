const { tidy, count, max, groupBy, rate, mutate } = require('@tidyjs/tidy');
const { message, mention, reaction } = require('../server/db');

//these functions assemble data from raw sqlize query

module.exports = {
  mostActiveUser,
  mostActiveReactor,
  mostUsedReaction,
  mostIgnoredUser,
};

//calculate user with the most messages
//takes array of messages, computes sorted list of users by messages, returns userId
//ties result in 'first come first serve' (earlier in messages array)
function mostActiveUser(messages) {
  try {
    let authorCount = tidy(messages, count('authorId', { sort: true }));
    return authorCount[0].authorId;
  } catch (error) {
    throw new Error('Message Object Empty');
  }
}

//returns user who has reacted the most
//takes array of reactions, computes sorted list of users by reactions, returns userId
function mostActiveReactor(reactions) {
  try {
    let reactionCount = tidy(reactions, count('reactorId', { sort: true }));
    return reactionCount[0].reactorId;
  } catch (error) {
    throw new Error('Reaction Object Empty');
  }
}

//returns most used emoji id
//takes array of reactions, computes sorted list of emojiIds by use, returns emojiId
function mostUsedReaction(reactions) {
  try {
    let reactionCount = tidy(reactions, count('emojiId', { sort: true }));
    return reactionCount[0].emojiId;
  } catch (error) {
    throw new Error('Reaction Object Empty');
  }
}

function mostIgnoredUser(messagesWithReactions) {
  try {
    let authorMessages = tidy(
      messagesWithReactions,
      groupBy('authorId', groupBy.entriesObject())
    ); //groups messages by user
    authorMessages.map((user) => {
      let reactionsTally = user.values.flatMap(
        (message) => message.reactions
      ).length; //tallies all reactions
      let reactionMessageRatio = reactionsTally / user.values.length;
      return { ...user, reactionMessageRatio };
    });
    authorMessages.sort(
      (a, b) => a.reactionMessageRatio < b.reactionMessageRatio
    );
    return authorMessages[0].key;
  } catch (error) {
    throw error;
  }
}

function mostLongWinded(messages) {
  try {
    let authorMessages = tidy(
      messages,
      groupBy('userId', groupBy.entriesObject())
    );
    authorMessages = tidy(
      authorMessages,
      mutate({
        avgLength: rate(
          (d) => d.messages.reduce((msg, sum) => msg.content.length + sum, 0),
          (d) => d.messages.length
        ),
      })
    )
    authorMessages.sort(a, b => a.avgLength > b.avgLength)
    return authorMessages[0]
  } catch (error) {
    throw error;
  }
}

function townGossip(mentions) {
  try {
    mentionsByAuthor = tidy(mentions, count('authorId', {sort:true}))
    return mentionsByAuthor[0].authorId
  } catch(error) {
    throw(error)
  }
}
