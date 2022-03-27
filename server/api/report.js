const router = require('express').Router();
const { message, mention, reaction } = require('../db');
const getReport = require('../../utilities/getReport')
//expect body to include guildId to specify data necessary
router.get('/', async (req, res, next) => {
  try {
    //fetch messages, mentions, reactions that include guildId
    let messages = await message.findAll({
      where: { guildId: req.body.guildId },
      include: ['reactions', 'mentions'],
    });

    messages = messages.map(message=> message.dataValues)
    let reactions = messages.flatMap(message => message.reactions)
    let mentions = messages.flatMap(message => message.mentions)

    let report = await getReport(messages, mentions, reactions)
    res.send(report);
  } catch (error) {
    throw(error);
  }
});

module.exports = router;
