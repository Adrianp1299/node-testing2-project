const router = require('express').Router()
const Character = require('./character-model')
const { checkNameExists } = require('./character-middleware')

router.get('/', async (req, res, next) => {
    try {
        const characters = await Character.find()
        res.json(characters)
    }catch (err) {
        next(err)
    }
})

router.post("/create", checkNameExists, (req, res, next) => {
    const { character_name, character_class, character_health } = req.body
    Character.createCharacter({character_name: character_name, character_class: character_class, character_health: character_health})
    .then
    return res.status(201).json({message: `Congrats creating ${character_name}`})
    .catch(next)
})

router.delete("/:id", async (req,res)=>{
    const id = req.params.id
    const delCharacter = await Character.deleteCharacter(id)
    res.status(200).json(delCharacter)
})

module.exports = router