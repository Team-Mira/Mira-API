const{message, reaction, mention} = require('../server/db')
const fs = require('fs')
const getData = async () => {
    const messages = await message.findAll({include: 'reactions'})
    const reactions = await reaction.findAll()
    const mentions = await mention.findAll()
    return {messages, reactions, mentions}
}


const writeData = async () => {
    const cData = await getData()
   fs.writeFile('./test.txt', JSON.stringify(cData), err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
      })
}

writeData()