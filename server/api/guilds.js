const router = require('express').Router();
const guildValidation = require('../controllers/guildValidation')
const getGuildIds = require('../controllers/guilds/getGuildIds')


module.exports = router;

router.get('/ids', getGuildIds)

router.post('/access', async (req, res, next) => {
  const { userId, guildId } = req.body

  const hasAccess = await guildValidation(userId, guildId)

  res.send(hasAccess)
})
