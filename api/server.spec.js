const request = require("supertest")
const knex = require("knex")

const server = require("./server")
const dbConfig = require("../knexfile")

const db = knex(dbConfig.development)

describe("server.js",()=>{
    describe("GET /games",()=>{
        it("should respond with 200",()=>{
            const response = await request(server).get("/games")
            expect(response.status).toBe(200)
        })
        it("should respond with giving json",()=>{
            const response = await request(server).get("/games")
            expect(response.type).toMatch(/jason/i)
        })
        it("should respond with an object",()=>{
            const response = await request(server).get("/games")
            expect(response.body).toEqual([])
        })
    })
    describe("POST /games",()=>{
        afterEach(async ()=>{
            await db("games").truncate()
        })
        it("should respond with 422 if any information is missing",()=>{
            const body = {
                title: 'Pacman',
               releaseYear: 1980 
            }
            const response = await request(server)
                .post("/games")
                .send(body)
                expect(response.status).toBe(422)
                db("games").truncate()
        })
        it("should respond with 201",()=>{
            const body = {
                 title: 'Pacman',
                 genre: 'Arcade',
                releaseYear: 1980 
            }
            const response = await request(server)
                .post("/games")
                .send(body)
                expect(response.status).toBe(201)
        })
        it("should respond with a returning array",()=>{
            const body = {
                title: 'Pacman',
                 genre: 'Arcade',
                releaseYear: 1980 
            }
            const response = await request(server)
                .post("/games")
                .send(body)
                expect(response.body.length).toBe(1)
        })
    })
})