const router = require('express').Router();
const createMessage = require('../controllers/message/createMessage')
const deleteMessage = require('../controllers/message/deleteMessage')
const updateMessage = require('../controllers/message/updateMessage')

module.exports = router;

router.post('/add', createMessage)

router.delete('/delete', deleteMessage)

router.put('/update', updateMessage)
