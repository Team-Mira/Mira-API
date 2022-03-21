const router = require('express').Router();
const User = require('../db/models/user')
const Channel = require('../db/models/channel')
const Server = require('../db/models/server')
const Message = require('../db/models/message')
const Emoji = require('../db/models/emoji')
const Reaction = require('../db/models/reaction')
const Mention = require('../db/models/mention')

module.exports = router;


/*
This route is creating the message in the DB while also creating the
user, server, and channel if they don't already exist
*/
router.post('/add', async (req, res, next) => {
  const { user, message, server, channel } = req.body

  const [cUser] = await User.findOrCreate({where: {id: user.id, name: user.name}})
  const [cServer] = await Server.findOrCreate({where: {id: server.id}})
  const [cChannel] = await Channel.findOrCreate({where: {id: channel.id}})

  if(message.mentionedUsers.length){
    message.mentionedUsers.forEach(async (user) =>  {
      const [mentionedUser] = await User.findOrCreate({where: {id: user.id, name: user.name}})
      if(user.avatar !== mentionedUser.avatar){
        await mentionedUser.update({avatar: user.avatar})
      }

      const cMention = Mention.create({messageId: message.id, userId: mentionedUser.id})
    })
  }

  if(message.emojis.length){
    message.emojis.forEach(async (emoji) => {
      await Emoji.findOrCreate({where: {id: emoji.id, name: emoji.name, animated: emoji.animated, url: emoji.url}})
    })
  }

  if(user.avatar !== cUser.avatar){
    await cUser.update({avatar: user.avatar})
  }

  if(channel.name !== cChannel.name){
    await cChannel.update({name: channel.name})
  }

  if(server.name !== cServer.name){
    await cServer.update({name: server.name})
  }

  if(cChannel.serverId === null){
    cChannel.setServer(cServer)
  }

  const cMessage = await Message.create({
    content: message.content,
    id: message.id,
    isReply: message.isReply,
    repliedUser: message.repliedUser,
    mentionedEveryone: message.mentionedEveryone,
    mentionedUsers: message.mentionedUsers
  })

  cMessage.setUser(cUser)
  cMessage.setChannel(cChannel)

  res.send('created')
})

router.delete('/delete', async (req, res, next) => {
  const { id } = req.body
  const cMessage = await Message.findByPk(id)
  const cReactions = await Reaction.findAll({where: {messageId: id}})

  cReactions.forEach( async (reaction) => {
    await reaction.destroy()
  })

  await cMessage.destroy()

  res.send('destroyed')
})

router.put('/update', async (req, res, next) => {
  const { id, content } = req.body
  const cMessage = await Message.findByPk(id)
  await cMessage.update({content: content})

  res.send('updated')
})

router.put('/reaction/add', async (req, res, next) => {
  const { message, reactor, emoji } = req.body
  const fileExt = emoji.animated ? '.gif' : '.png'
  const url = `https://cdn.discordapp.com/emojis/${emoji.id}${fileExt}`

  const [cReactor] = await User.findOrCreate({where: {id: reactor.id, name: reactor.name}})

  if(cReactor.avatar !== cReactor.avatar){
    await cReactor.update({avatar: reactor.avatar})
  }

  await Emoji.findOrCreate({where: {id: emoji.id, name: emoji.name, animated: emoji.animated, url}})


  Reaction.create({messageId: message.id, userId: message.userId, reactorId: reactor.id, emojiId: emoji.id })

  res.send('updated')
})

router.put('/reaction/remove', async (req, res, next) => {
  const { message } = req.body
  const cMessage = await Message.findByPk(message.id)
  const cUser = await cMessage.getUser()
  await cMessage.update({ reactions: cMessage.reactions - 1})
  await cUser.update({ reactionsRecieved: cUser.reactionsRecieved - 1})

  res.send('updated')
})
