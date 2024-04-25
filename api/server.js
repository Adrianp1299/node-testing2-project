const express = require('express')
const resourceRouter = require('./resource/resource-router')

const server = express()

server.use(express.json())

server.use('/api/resource', resourceRouter)

router.use('*', (req, res, next)=> {
    res.json({api: 'up'})
})

module.exports = server