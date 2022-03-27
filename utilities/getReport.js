const {
  mostActiveUser,
  mostActiveReactor,
  mostUsedReaction,
  mostIgnoredUser,
  mostLongWinded,
  townGossip,
} = require('./users');
const {updateUserGraph} = require('./pairs')

module.exports = async (messages, mentions, reactions) => {
  return await Promise.allSettled([ mostActiveUser(messages),
    mostActiveReactor(reactions),
    mostUsedReaction(reactions),
    mostIgnoredUser(messages),
    mostLongWinded(messages),
    townGossip(mentions),
    updateUserGraph(messages, mentions, reactions)
]
);
};
