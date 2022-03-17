const router = require('express').Router();
module.exports = router;

router.use('/test', require('./test'));
router.use('/message', require('./message'));

router.use((req, res, next) => {
  res.status(404).send('Not found');
});
