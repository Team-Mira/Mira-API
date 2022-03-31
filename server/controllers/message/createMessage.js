const { message } = require('../../db/models/')
const ApiError = require('../../errors/ApiError')

const createMessage = async (req, res, next) => {
  const { newMessage } = req.body

  if(!newMessage) {
    next(ApiError.badRequest('No Message Recieved'))
    return
  }

  try{
    await message.create(newMessage)
  } catch(err){
    next(ApiError.badRequest('Error Creating Message'))
    return
  }

  res.send('Created Message')
}

module.exports = createMessage
