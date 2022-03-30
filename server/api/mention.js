const router = require('express').Router();
const { mention, message } = require('../db/models')

module.exports = router;

router.post('/add', async (req, res, next) => {
  const { newMention } = req.body


  const cMessage = await message.findByPk(newMention.messageId)

  if(!cMessage){
    res.send('mention skipped')
  }

  await mention.create(newMention)
  res.send('created')
})
