const router = require('express').Router();
const User = require('../db/models/user')
const Channel = require('../db/models/channel')
const Server = require('../db/models/server')
const Message = require('../db/models/message')

module.exports = router;


/*
This route is creating the message in the DB while also creating the
user, server, and channel if they don't already exist
*/
router.post('/add', async (req, res, next) => {
  const { user, message, server, channel } = req.body

  const cUser = await User.findOrCreate({where: {id: user.id, name: user.name}})
  const cServer = await Server.findOrCreate({where: {id: server.id}})
  const cChannel = await Channel.findOrCreate({where: {id: channel.id}})

  if(cChannel[0].serverId === null){
    cChannel[0].setServer(cServer[0])
  }

  const cMessage = await Message.create({
    content: message.content,
    id: message.id,
    isReply: message.isReply,
    repliedUser: message.repliedUser
  })

  cMessage.setUser(cUser[0])
  cMessage.setChannel(cChannel[0])

  res.send('created')
})

router.delete('/delete', async (req, res, next) => {
  const { id } = req.body
  const cMessage = await Message.findByPk(id)
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
  const { message } = req.body
  const cMessage = await Message.findByPk(message.id)
  const cUser = await cMessage.getUser()
  await cMessage.update({ reactions: cMessage.reactions + 1})
  await cUser.update({ reactionsRecieved: cUser.reactionsRecieved + 1})

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
