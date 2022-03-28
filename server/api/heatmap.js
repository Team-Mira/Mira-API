const router = require('express').Router();
const {Message} = require('../db/models')
const {timeSpread} = require('../../utilities/channel')
module.exports = router;

router.get('/:channelId', async (req, res, next) => {
  const messages = await Message.findAll({
    channelId: req.params.channelId
  })
  res.send(timeSpread(messages))
})
