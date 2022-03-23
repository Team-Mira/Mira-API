const router = require('express').Router();
<<<<<<< HEAD
const User = require('../db/models/user')

module.exports = router

//sends all reactions
router.get('/', async (req, res, next) => {
  const users = await User.findAll()
  res.send(users)
})

//send highest reactions
router.get('/mostreactions', async (req, res, next) => {
  const user = await User.max('reactions')
  res.send(user)
=======
const { reaction } = require('../db/models')

module.exports = router;

router.post('/add', async (req, res, next) => {
  const { newReaction } = req.body
  reaction.create(newReaction)
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
>>>>>>> 10866b235bb7295584184783ba4bab07defe89fb
})
