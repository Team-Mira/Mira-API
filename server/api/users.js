const router = require('express').Router();
const getUserGuilds = require('../controllers/users/getUserGuilds')
const getUserIds = require('../controllers/users/getUserIds')


module.exports = router;

router.get('/:userId/guilds', getUserGuilds)

router.get('/ids', getUserIds)
