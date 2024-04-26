const db = require("../../data/db-config")

function findBy(filter) {
    return db('characters').where(filter)
}

async function createCharacter(character){
    const [id] = await db("characters").insert(character)
    return db("characters").where("character_id", id).first()
}

module.exports = {
    findBy,
    createCharacter,
}