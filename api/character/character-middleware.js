const Character = require('../character/character-model')

const checkNameExists = async (req, res, next) => {
    try{
        const [character] = await Character.findBy({ character_name: req.body.character_name})
        if (character) {
          next ({status: 403, message: 'Name already Exists'})
        }else {
          next()
        }
       } catch(err) {
        next(err)
       }
}

const checkCharacterPayload = (req, res, next ) => {
  const error = { status: 400 }
  const { character_name, character_class, character_health } = req.body
  if (character_name === undefined || character_class === undefined || character_health === undefined) {
    error.message = 'name, class and health are required'
  }
  if(error.message) {
    next(error)
  }else{
    next()
  }
}


module.exports = {
    checkNameExists,
    checkCharacterPayload
}