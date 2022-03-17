const router = require('express').Router();

module.exports = router;

//sends successful response
router.get('/', (req, res, next) => {
  res.send('success')
})
