const router = require('express').Router();
module.exports = router;


router.use('/connect', require('./connect'));
router.use('/message', require('./message'));
router.use('/guilds', require('./guilds'));
router.use('/reaction', require('./reaction'))

router.use((req, res, next) => {
  res.status(404).send('Not found');
});
