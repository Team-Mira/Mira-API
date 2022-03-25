const router = require('express').Router();
const guildsSearch = require('../modules/guildsSearch')
const guildValidation = require('../modules/guildValidation')


module.exports = router;


router.post('/', async (req, res, next) => {
  const { id } = req.body

  const cGuilds = await guildsSearch(id)
  res.send(cGuilds)
})

router.post('/access', async (req, res, next) => {
  const { userId, guildId } = req.body

  const hasAccess = await guildValidation(userId, guildId)

  res.send(hasAccess)
})
