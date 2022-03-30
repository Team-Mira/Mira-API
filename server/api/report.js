const router = require('express').Router();
const { message, mention, reaction } = require('../db');
const dataCompiler = require('../../utilities/dataCompiler');
const userCompiler = require('../../utilities/userCompiler')
const guildUsers = require('../modules/guildUsers')


//new get route
router.get('/:guildId', async (req, res, next) => {
  try {
    const { guildId } = req.params;

    const cData = await dataCompiler(guildId);

    res.send(cData);
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
