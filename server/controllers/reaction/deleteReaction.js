const { reaction } = require('../../db/models')
const ApiError = require('../../errors/ApiError')

const deleteReaction = async (req, res, next) => {
  const { ids } = req.body
  let cReaction

  if(!ids) {
    next(ApiError.badRequest('No IDs Recieved'))
    return
  }

  try{
    cReaction = await reaction.findAll({
      where: {
        reactorId: ids.reactorId,
        messageId: ids.messageId,
        emojiId: ids.emojiId
    }})
  }catch(err){
    next(ApiError.internal('Error Fetching Reaction'))
    return
  }

  try{
    cReaction[0].destroy()
  }catch(err){
    next(ApiError.internal('Error Deleting Reaction'))
    return
  }

  res.send('Deleted Reaction')
}

module.exports = deleteReaction
