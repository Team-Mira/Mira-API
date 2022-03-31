const router = require('express').Router();
const userIds = require('../controllers/userIds')


module.exports = router;

router.get('/', async (req, res, next) => {

  const ids = await userIds()

  res.send(ids)
})
