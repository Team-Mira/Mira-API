const router = require('express').Router();
const userIds = require('../modules/userIds')


module.exports = router;

router.get('/', async (req, res, next) => {

  const ids = await userIds()

  res.send(ids)
})
