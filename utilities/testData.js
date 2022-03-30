const{message, reaction, mention} = require('../server/db')
const{updateUserGraph} = require('./pairs')
const path = require('path')


const fs = require('fs')
const getData = async () => {
    const messages = await message.findAll({include: 'reactions'})
    const reactions = await reaction.findAll()
    const mentions = await mention.findAll()
    return {messages, reactions, mentions}
}


const writeData = async (data) => {
    const cData = await data
   fs.writeFile('./test.json', JSON.stringify(cData), err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
      })
}

writeData(getData())