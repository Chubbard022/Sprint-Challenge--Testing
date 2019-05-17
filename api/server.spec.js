const request = require("supertest")
const knex = require("knex")

const server = require("./server")
const dbConfig = require("../knexfile")

const db = knex(dbConfig.development)

describe("api", () => {
    describe("get /games", () => {
      it("should respond with 200", async () => {
        const response = await request(server).get("/games");
        expect(response.status).toBe(200);
      });
  
      it("should respond with giving json", async () => {
        const response = await request(server).get("/games");
        expect(response.type).toMatch(/json/i);
      });
  
      it("should respond with an object", async () => {
        const response = await request(server).get("/games");
        expect(response.body).toEqual([]);
      });
    });
  
    describe("post /games", () => {
      afterEach(async () => {
        await db("games").truncate();
      });
  
      it("should respond with 420 if any information is missing", async () => {
        const body = {
            title: 'dig dug',
            releaseYear: 1970
        };
        const response = await request(server)
          .post("/games")
          .send(body);
        expect(response.status).toBe(420);
        db("games").truncate();
      });
  
      it("should respond with 201", async () => {
        const body = {
            title: 'dig dug',
            genre: "Arcade",
            releaseYear: 1970
        };
        const response = await request(server)
          .post("/games")
          .send(body);
        expect(response.status).toBe(201);
      });
  
      it("should respond with a returning array", async () => {
        const body = {
            title: 'dig dug',
            genre: "Arcade",
            releaseYear: 1970
        };
        const response = await request(server)
          .post("/games")
          .send(body);
        expect(response.body.length).toBe(1);
      });
    });
  });
  