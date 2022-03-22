const router = require('express').Router();
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
})
