const router = require('express').Router();
const guildsSearch = require('../modules/guildsSearch')


module.exports = router;


router.post('/', async (req, res, next) => {
  const { id } = req.body

  const cGuilds = await guildsSearch(id)

  res.send(cGuilds)
})
