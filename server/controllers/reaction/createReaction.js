const { reaction } = require('../../db/models')
const ApiError = require('../../errors/ApiError')

const createReaction = async (req, res, next) => {
  const { newReaction } = req.body

  if(!newReaction){
    next(ApiError.badRequest('No Reaction Recieved'))
    return
  }

  try{
    await reaction.create(newReaction)
  }catch(err){
    next(ApiError.internal('Error Creating Reaction'))
    return
  }

  res.send('Created Reaction')
}

module.exports = createReaction
