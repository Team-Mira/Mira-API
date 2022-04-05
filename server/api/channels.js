const router = require('express').Router();
const getChannelIds = require('../controllers/channels/getChannelIds')


module.exports = router;

// Gets all channel IDs for static paths
router.get('/ids', getChannelIds)
