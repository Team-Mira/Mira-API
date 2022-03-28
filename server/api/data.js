const router = require('express').Router();
const mostMessagesGuild = require('../../utilities/mostMessagesGuild')

module.exports = router;

router.get('/:guildId', async (req, res, next) => {
  const { guildId } = req.params

  const mostMessages = await mostMessagesGuild(guildId)

  res.send(mostMessages)
})
