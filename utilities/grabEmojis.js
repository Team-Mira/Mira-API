const grabEmojis = async (client) =>{
  const emojis = client.emojis.cache
  const cEmojis = {}

  emojis.forEach(emoji => {
    cEmojis[emoji.name]= {url: emoji.url}
  })

  return cEmojis
}

module.exports = grabEmojis
