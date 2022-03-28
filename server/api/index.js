const router = require('express').Router();
module.exports = router;
const morgan = require('morgan')


router.use('/connect', require('./connect'));
router.use('/message', require('./message'));
router.use('/guilds', require('./guilds'));
router.use('/reaction', require('./reaction'))
router.use('/mention', require('./mention'))
<<<<<<< HEAD
router.use('/heatmap', require('./heatmap'))
=======
router.use('/report', require('./report'))
>>>>>>> main

router.use((req, res, next) => {
  res.status(404).send('Not found');
});
