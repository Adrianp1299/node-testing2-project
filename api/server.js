const express = require('express')
const characterRouter = require('./character/character-router')

const server = express()

server.use(express.json())

server.use('/api/character', characterRouter)

server.get('/', (req, res, next)=> {
    res.json({api: 'up'})
})

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  });

module.exports = server