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

module.exports = {
    checkNameExists
}