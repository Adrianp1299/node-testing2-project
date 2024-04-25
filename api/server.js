const express = require('express')
const characterRouter = require('./character/character-router')

const server = express()

server.use(express.json())

server.use('/api/character', characterRouter)

server.use('*', (req, res, next)=> {
    res.json({api: 'up'})
})

module.exports = server