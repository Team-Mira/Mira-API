const router = require('express').Router();
const {message} = require('../db/messages')
const {timeSpread} = require('../../utilities/channel')
module.exports = router;

router.get('/:channelId', async (req, res, next) => {
  const messages = await message.findAll({
    channelId: req.params.channelId
  })
  res.send(timeSpread(messages))
})
