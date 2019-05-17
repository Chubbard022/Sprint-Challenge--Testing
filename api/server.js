const express = require("express")
const knex = require("knex")
const helmet = require("helmet")
const server = express()
const dbConfig = require("../knexfile")
const db = knex(dbConfig.development)

server.use(helmet())
server.use(express.json())

server.get("/",(req,res)=>{
    res.status(200).json("Working")
})


server.get("/games",(req,res)=>{
    db("games")
        .then(rows =>{
            res.status(200).json(rows)
        })
        .catch(err=>{
            res.status(500).json({errorMessage:"cannot find game"})
        })
})  

server.post("/games",(req,res)=>{
    const body = req.body;
    if(body.title && body. genre){
        db("games")
            .insert(body)
        .then(ids=>{
            res.status(201).json(ids)
        })
        .catch(err=>{
            res.status(500).json({errorMessage:"error occurred when posting game"})
        })
    }else{
        res.status(420).json({errorMessage:"when posting, add all required fields"})
    }
})


module.exports = server;