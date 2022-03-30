const router = require('express').Router();
const { reaction } = require('../db/models')

module.exports = router;

router.post('/add', async (req, res, next) => {
  const { newReaction } = req.body
  await reaction.create(newReaction)
  res.send('created')
})

router.delete('/delete', async (req, res, next) => {
  const { ids } = req.body
  const cReaction = await reaction.findAll({
    where: {
      reactorId: ids.reactorId,
      messageId: ids.messageId,
      emojiId: ids.emojiId
  }})
  cReaction[0].destroy()
  res.send('deleted')
})
