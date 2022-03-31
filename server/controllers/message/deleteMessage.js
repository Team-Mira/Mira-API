const { message, reaction } = require('../../db/models/')
const ApiError = require('../../errors/ApiError')

const deleteMessage = async (req, res, next) => {
  const { id } = req.body
  let cMessage
  let cReactions

  if(!id) {
    next(ApiError.badRequest('No ID Recieved'))
    return
  }

  try{
    cMessage = await message.findByPk(id)
  }catch(err){
    next(ApiError.internal('Error Fetching Message'))
    return
  }

  try{
    cReactions = await reaction.findAll({where: {messageId: id}})
  }catch(err){
    next(ApiError.internal('Error Fetching Reactions'))
    return
  }

  try{
    cReactions.forEach( async (e) => {
      await e.destroy()
    })
  }catch(err){
    next(ApiError.internal('Error Deleting Reactions'))
    return
  }

  try{
    await cMessage.destroy()
  }catch(err){
    next(ApiError.internal('Error Deleting Message'))
    return
  }

  res.send('Deleted Message')
}

module.exports = deleteMessage
