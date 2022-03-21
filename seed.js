const db = require('./server/db')
const {green, red} = require('chalk')
const {
    Channel,
    Message,
    User,
    Server,
    Emoji,
    Reaction, 
    Mention
  } = require('./server/db/models')

const messages = [{
    id: 134578,
    channelId: 1111,
    serverId: 3333,
    userId: 555,
      content: "The Medium Is The Message",
      isReply: false,
} , {id: 2222,
  content: "Hey I agree",
  userId: 667,
  isReply: true,
  repliedUser: 555,
 }
]
const emojis = [{
    id: 999,
    name: "smiley",
    animated: false,
  }]
const reactions = [{
    messageId: 134578,
    userId: 667,
    reactorId: 555,
    emojiId: 999
  }]
const mentions = [
    {
        messageId: 2222,
        userId: 555,
      }
]
const channels = [{
    id: 1111,
    serverId: 3333
  }]
const servers = [{
    id: 3333
}]
const users = [{
    id: 555,
    name: "Botman",
  }, {
    id: 667,
    name: "Roban",
  }]


const seed = async () => {
    try {
      await db.sync({force: true})
  
      await Promise.all([servers.map(server => {return Server.create(server);}),
        channels.map(channel => {return Channel.create(channel);}),
        users.map(user=> {return User.create(user)}),
          messages.map(message => {return Message.create(message);}),
          emojis.map(emoji => {return Emoji.create(emoji);}),
          reactions.map(reaction => {return Reaction.create(reaction);}),
          mentions.map(mention => {return Mention.create(mention);}),
          
      ]);
  
      console.log(green('Seeding success!'))
    }
    catch (err) {
      console.error(red('Oh no! Something went wrong!'))
      console.error(err)
    }
  }
  
  seed();