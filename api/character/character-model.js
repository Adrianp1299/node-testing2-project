const db = require("../../data/db-config")

function find() {
    return db('characters')
}

function findBy(filter) {
    return db('characters').where(filter)
}

async function createCharacter(character){
    const [id] = await db("characters").insert(character)
    return db("characters").where("character_id", id).first()
}

async function deleteCharacter(id){
    const character = await db("characters").where("character_id", id).first()
    await db("characters").where("character_id", id).del()
    return character
}

module.exports = {
    find,
    findBy,
    createCharacter,
    deleteCharacter,
}