const router = require('express').Router();
const guildsSearch = require('../modules/guildsSearch')
const guildValidation = require('../modules/guildValidation')
const guildTest = require('../modules/guildTest')
const guildIds = require('../modules/guildIds')


module.exports = router;

router.get('/', async (req, res, next) => {

  const ids = await guildIds()

  res.send(ids)
})

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





// Remove before production!!!!!!!
router.get('/test', async (req, res, next) => {
  await guildTest()

  res.send('test')
})
