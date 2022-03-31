const router = require('express').Router();
const createMention = require('../controllers/mention/createMention')

module.exports = router;

router.post('/add', createMention)
