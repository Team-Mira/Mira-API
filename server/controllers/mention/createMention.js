const { message, mention } = require('../../db/models/')
const ApiError = require('../../errors/ApiError')

const createMention = async (req, res, next) => {
  const { newMention } = req.body

  if(!newMention) {
    next(ApiError.badRequest('No Mention Recieved'))
    return
  }

  try{
    const cMessage = await message.findByPk(newMention.messageId)
    if(!cMessage){
      next(ApiError.internal('Message Does Not Exist'))
      return
    }
  }catch(err){
    next(ApiError.internal('Error Fetching Message'))
    return
  }

  try{
    await mention.create(newMention)
  }catch(err){
    next(ApiError.internal('Error Creating Mention'))
    return
  }

  res.send('Created Mention')
}

module.exports = createMention
