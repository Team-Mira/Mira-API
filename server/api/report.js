const router = require('express').Router();
const { message, mention, reaction } = require('../db');
const {getReport, getUserReport} = require('../../utilities/getReport')
//expect body to include guildId to specify data necessary
router.get('/:guildId', async (req, res, next) => {
  try {
    //fetch messages, mentions, reactions that include guildId
    let {guildId} = req.params
    let messages = await message.findAll({
      where: { guildId: guildId },
      include: ['reactions', 'mentions'],
    });

    messages = messages.map(message=> message.dataValues)
    let reactions = messages.flatMap(message => message.reactions)
    let mentions = messages.flatMap(message => message.mentions)

    let guildReport = await getReport(messages, mentions, reactions)
    res.send({ guildId, guildReport});
  } catch (error) {
    next(error);
  }
});

//expect array of channelIds in body
router.get('/channel/:channelId', async (req,res,next) => {
    try{

       let channelReports = Promise.all(req.params.channelIds.map(async ({channelId}) => {
            let messages = await message.findAll({
                where: { channelId: channelId },
                include: ['reactions', 'mentions'],
              });
            messages = messages.map(message=> message.dataValues)
            let reactions = messages.flatMap(message => message.reactions)
            let mentions = messages.flatMap(message => message.mentions)  
            let channelReport = await getReport(messages, mentions, reactions)  
            return {channelId, channelReport}
        }))
        res.send(await channelReports)
        
    }catch(error){
        next(error)
    }
})

//expect authorId in body
router.get('/me/:authorId', async (req, res, next) => {
  try{
    let {authorId} = req.params
    let messages = await message.findAll({where: {authorId: authorId}})
    messages = messages.map(message=> message.dataValues)
    let reactions = messages.flatMap(message => message.reactions)
    let userReport = await getUserReport(messages,reactions)
    res.send({authorId, userReport})
    }catch(error){
    next(error)
  }
})
module.exports = router;
