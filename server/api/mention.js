const router = require('express').Router();
const { mention } = require('../db/models')

module.exports = router;

router.post('/add', async (req, res, next) => {
  const { newMention } = req.body

  mention.create(newMention)
  res.send('created')
})
