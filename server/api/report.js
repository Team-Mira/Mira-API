const router = require('express').Router();
const { message, mention, reaction } = require('../db');
const guildDataCompiler = require('../../utilities/guildDataCompiler');
const channelDataCompiler = require('../../utilities/channelDataCompiler')
const userCompiler = require('../../utilities/userCompiler')
const guildUsers = require('../controllers/guildUsers')


//new get route
router.get('/:guildId', async (req, res, next) => {
  try {
    const { guildId } = req.params;

    if(guildId === 'demo'){
      const cData = await guildDataCompiler('956985200196350013')
      res.send(cData);
    } else {
      const cData = await guildDataCompiler(guildId);
      res.send(cData);
    }
  } catch (error) {
    throw(error);
  }
});

router.get('/:guildId/users', async (req, res, next) => {
  try {
    const {guildId} = req.params
    const cUsers = await guildUsers(guildId)

    const usersData = []
    for(let id of cUsers){
      usersData.push(await userCompiler(id))
    }

    res.send(usersData)
  } catch (error) {
    throw(error);
  }
});

router.get('/channel/:channelId', async (req, res, next) => {
  try {
    const { channelId } = req.params;

    const cData = await channelDataCompiler(channelId);

    res.send(cData);
  } catch (error) {
    throw(error);
  }
});

router.get('/user/:authorId', async (req, res, next) => {
  try {

    const {authorId} = req.params
    const cUserData = await userCompiler(authorId)

    res.send(cUserData)
  } catch (error) {
    next(error);
  }
});

module.exports = router;
