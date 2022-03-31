const router = require('express').Router();
const getGuildIds = require('../controllers/guilds/getGuildIds')


module.exports = router;

// Gets all guild IDs for static paths
router.get('/ids', getGuildIds)
