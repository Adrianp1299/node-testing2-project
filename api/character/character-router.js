const router = require('express').Router()
const Character = require('./character-model')
const { checkNameExists } = require('./character-middleware')

router.post("/create", checkNameExists, (req, res, next) => {
    const { character_name, character_class, character_health } = req.body
    Character.createCharacter({character_name: character_name, character_class: character_class, character_health: character_health})
    .then
    return res.status(201).json({message: `Congrats creating ${character_name}`})
    .catch(next)
})

module.exports = router