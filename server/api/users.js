const router = require('express').Router();
const getUserGuilds = require('../controllers/users/getUserGuilds')
const getUserIds = require('../controllers/users/getUserIds')


module.exports = router;

// Sends and array of objects with guild information and what channels the user
// can see
router.get('/:userId/guilds', getUserGuilds)

// Gets all user IDs for static paths
router.get('/ids', getUserIds)
