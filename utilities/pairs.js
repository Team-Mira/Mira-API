const { expand, tidy, distinct, map } = require('@tidyjs/tidy');
const {message, mention, reaction} = require('../server/db')
module.exports = { generatePairs, pairStrength, updateUserGraph};
function getAuthors(messages) {
    return tidy(
        messages,
        distinct(['authorId']),
        map((d) => ({ authorId: d.authorId})) 
      );
}
function generatePairs(messages) {
  let authors = getAuthors(messages)
  return mCombinations(authors, 2);
}

function mCombinations(set, m){
    let combs = []
    if(m === 0){
        return []
    } else if(m===set.length){
        return [set]
    } else if(m===1){
        return set.map(x => [x])
    } 
        for(let i=0; i<=set.length-m; i++){
            let car = set.slice(i, i+1)
            let cdr = mCombinations(set.slice(i+1), m-1)
            combs.push(cdr.map(comb => car.concat(comb)))
        }

        return combs
}
//calculate tally of replies, mentions and reactions between a user pair
// split these into multiple functions for updating aspects of state of map
function pairStrength(pair, messages, mentions, reactions){
    let pairReplies = messages.filter(message=> {
        let sourceReplied = message.authorId === pair[0].authorId && message.repliedUserId === pair[1].authorId
        let targetReplied = message.authorId === pair[1].authorId && message.repliedUserId === pair[0].authorId
        return sourceReplied || targetReplied
    })

    let pairMentions = mentions.filter(mention=> {
        let sourceMentioned = mention.authorId === pair[0].authorId && mention.mentionedUser === pair[1].authorId
        let targetMentioned = mention.authorId === pair[1].authorId && mention.mentionedUser === pair[0].authorId
        return sourceMentioned || targetMentioned
    })

    let pairReactions = reactions.filter(reaction=> {
        let sourceReacted = reaction.reactorId === pair[0].authorId && reaction.authorId === pair[1].authorId
        let targetReacted = mention.reactorId === pair[1].authorId && mention.authorId === pair[0].authorId
        return sourceMentioned || targetMentioned)
    
    pairReplies = tidy(pairReplies, count('messages'))
    pairMentions = tidy(pairMentions, count('mentions'))
    pairReactions = tidy(pairReactions, count('reactions'))

    return pairReplies.messages + pairMentions.mentions + pairReactions.reactions
}

//generates nodes and links from provided messages mentions and reactions
//hopefully we can provide incremental updates given messages since a certain date, and 
//combine the updates into the previous 
function updateUserGraph(messages, mentions, reactions) {
    const nodes = getAuthors(messages)
    const links = []
    const pairs = generatePairs(messages)
    pairs.map(pair => {
        let strength = pairStrength(pair, messages, mentions, reactions)
        links.push({source: pair[0].authorId, target: pair[1].authorId, value: strength})
    })
    //return object with nodes and links
    return {nodes, links}
}