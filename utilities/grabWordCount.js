const grabWordCount = (messages) => {

  const totalWords = {}

  messages.forEach(message => {
    const messageContent = message.content.replace(/<.*?>/g, '')
    const words = messageContent.split(' ')
    words.forEach(word => {
      if(word !== '' && word !== ' '){
        if(totalWords[word]){
          totalWords[word].value = totalWords[word].value + 1
        } else {
          totalWords[word] = {value: 1, text: word}
        }
      }
    })
  })
  return Object.values(totalWords)
}

module.exports = grabWordCount
