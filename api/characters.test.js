const request = require("supertest")
const db = require("../data/db-config")
const server = require("../api/server")

const character1 = {character_name: "Adrian", character_class:"wizard"}
const character2 = {character_name: "Max", character_class:"warlock"}

beforeAll(async ()=> {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db("characters").truncate()
})



it("corrct env var", () => {
    expect(process.env.DB_ENV).toBe("testing")
})

