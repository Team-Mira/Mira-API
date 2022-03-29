const { expand, tidy, distinct, map, count } = require('@tidyjs/tidy');
const {message, mention, reaction} = require('../server/db')
module.exports = { generatePairs, pairStrength, updateUserGraph};
function getAuthors(messages, mentions) {
    return tidy(
        messages,
        distinct(['authorId']),
        map((d) => ({ id: d.authorId}))
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
            cdr.map(comb => combs.push(car.concat(comb)))
        }

        return combs
}
//calculate tally of replies, mentions and reactions between a user pair
// split these into multiple functions for updating aspects of state of map
function pairStrength(pair, messages, mentions, reactions){
    let pairReplies = messages.filter(message => {
        let sourceReplied = message.authorId === pair[0].id && message.repliedUserId === pair[1].id
        let targetReplied = message.authorId === pair[1].id && message.repliedUserId === pair[0].id
        return sourceReplied || targetReplied
    })

    let pairMentions = mentions.filter(mention => {
        let sourceMentioned = mention.authorId === pair[0].id && mention.mentionedId === pair[1].id
        let targetMentioned = mention.authorId === pair[1].id && mention.mentionedId === pair[0].id
        return sourceMentioned || targetMentioned
    })

    let pairReactions = reactions.filter(reaction => {
        let sourceReacted = reaction.reactorId === pair[0].id && reaction.authorId === pair[1].id
        let targetReacted = reaction.reactorId === pair[1].id && reaction.authorId === pair[0].id
        return sourceReacted || targetReacted
    })

    return pairReplies.length + pairMentions.length + pairReactions.length
}

//generates nodes and links from provided messages mentions and reactions
//hopefully we can provide incremental updates given messages since a certain date, and
//combine the updates into the previous
function updateUserGraph(messages, mentions, reactions) {
    const nodes = getAuthors(messages)
    const edges = []
    const pairs = generatePairs(messages)

    console.log(pairs)

    pairs.map(pair => {
        let strength = pairStrength(pair, messages, mentions, reactions)
        edges.push({from: pair[0].id, to: pair[1].id, value: strength})
    })
    //return object with nodes and links
    return {nodes, edges}
}
