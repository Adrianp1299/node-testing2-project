const request = require("supertest")
const db = require("../data/db-config")
const server = require("../api/server")
const Character = require("../api/character/character-model")

const character1 = {character_name: "Adrian", character_class:"wizard", character_health:40}
const character1_1 = {character_name: "Adrian", character_class:"Jock", character_health:100}
const character2 = {character_name: "Max", character_class:"warlock", character_health:20}

beforeAll(async ()=> {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db("characters").truncate()
})

afterAll(async ()=>{
    await db.destroy()
})


it("(1)corrct env var", () => {
    expect(process.env.DB_ENV).toBe("testing")
})


describe("Character model functions", () => {
    describe("Create character",()=>{
        it("(2)add a character to the db", async ()=>{
            let character
            await Character.createCharacter(character1)
            characters = await db("characters")
            expect(characters).toHaveLength(1)

            await Character.createCharacter(character2)
            characters = await db("characters")
            expect(characters).toHaveLength(2)
        })
        it("(3)added character name has to be unique", async () => {
            const res = await request(server).post('/api/character/create').send(character1)
            expect(res.body.message).toMatch(/Congrats creating Adrian/i)
        })
    })
})
