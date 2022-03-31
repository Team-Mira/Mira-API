const router = require('express').Router();
const createReaction = require('../controllers/reaction/createReaction')
const deleteReaction = require('../controllers/reaction/deleteReaction')

module.exports = router;

router.post('/add', createReaction)

router.delete('/delete', deleteReaction)
