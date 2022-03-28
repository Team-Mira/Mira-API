const {
  mostActiveUser,
  mostActiveReactor,
  mostUsedReaction,
  mostIgnoredUser,
  mostLongWinded,
  townGossip,
} = require('./users');
const { updateUserGraph } = require('./pairs');
const {
  topChannel,
  topWord,
  topReaction,
  hottestMessage
} = require('./singleUser')


const getReport = async (messages, mentions, reactions) => {
  return {
    mostActiveUser: mostActiveUser(messages) ,
    mosActiveReactor: mostActiveReactor(reactions) ,
    mostUsedReaction: mostUsedReaction(reactions) ,
    townGossip: townGossip(mentions) ,
    updateUserGraph: updateUserGraph(messages, mentions, reactions)
  }
  ;
}

const getUserReport = async (messages, reactions) => {
return Promise.all([
  {topChannel: topChannel(messages)},
  {topWord: topWord(messages)},
  // {topReaction: topReaction(reactions)},
  {hottestMessages: hottestMessage(messages)}
]


)
}

module.exports = {getReport, getUserReport}