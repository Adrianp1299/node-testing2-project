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
        it("(3)receive correct message for creating character", async () => {
            const res = await request(server).post('/api/character/create').send(character1)
            expect(res.body.message).toMatch(/Congrats creating Adrian/i)
        })
        it("(4)added character name has to be unique", async ()=> {
            await Character.createCharacter(character1)

            const res = await request(server).post('/api/character/create').send(character1_1)
            expect(res.body.message).toMatch(/Name already Exists/i)
        })
        it("(5)inserted character", async () => {
            const character = await Character.createCharacter(character1)
            expect(character).toMatchObject({...character})
        })
    })
    describe("Get all characters", () => {
        it("(6)returns all charcters", async ()=> {
            await db("characters").insert(character1)
            await db("characters").insert(character2)
            let characters = await request(server).get("/api/character/")
            expect(characters.body).toMatchObject([character1, character2])
        })
    })
    describe("[DELETE] / - deletes character", () => {
        it("(7)removes character from db", async ()=> {
            const [character_id] = await db("characters").insert(character1)
            let character = await db("characters").where({character_id}).first()
            expect(character).toBeTruthy()
            await request(server).delete("/api/character/" + character_id)
            character = await db("characters").where({character_id}).first()
            expect(character).toBeFalsy()
        })
        it("(8)responds with deleted character", async ()=> {
            await db("characters").insert(character1)
            let character = await request(server).delete("/api/character/1")
            expect(character.body).toMatchObject(character1)
        })
    })
})
