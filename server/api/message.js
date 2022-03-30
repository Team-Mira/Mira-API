const router = require('express').Router();
const { message, reaction } = require('../db/models')

module.exports = router;

router.post('/add', async (req, res, next) => {
  const { newMessage } = req.body

  await message.create(newMessage)
  res.send('created')
})

router.delete('/delete', async (req, res, next) => {
  const { id } = req.body
  const cMessage = await message.findByPk(id)
  const cReactions = await reaction.findAll({where: {messageId: id}})

  cReactions.forEach( async (e) => {
    await e.destroy()
  })

  await cMessage.destroy()
  res.send('destroyed')
})

router.put('/update', async (req, res, next) => {
  const { id, content } = req.body
  const cMessage = await message.findByPk(id)
  await cMessage.update({content: content})

  res.send('updated')
})
