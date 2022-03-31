const { message } = require('../../db/models/')
const ApiError = require('../../errors/ApiError')

const updateMessage = async (req, res, next) => {
  const { id, content } = req.body
  let cMessage

  if(!id){
    next(ApiError.badRequest('No ID Recieved'))
    return
  }

  if(!content){
    next(ApiError.badRequest('No Content Recieved'))
    return
  }

  try{
    cMessage = await message.findByPk(id)
  }catch(err){
    next(ApiError.internal('Error Fetching Message'))
    return
  }

  try{
    await cMessage.update({content: content})
  }catch(err){
    next(ApiError.internal('Error Updating Message'))
    return
  }

  res.send('Updated Message')
}

module.exports = updateMessage
