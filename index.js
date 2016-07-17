const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

const router = require('./router')

// Mongo DB Setup
mongoose.connect('mongodb://localhost:authentication/authentication')

// Node App setup
const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json({type: '*/*'}))
router(app)

// Local Server setup
const port = process.env.PORT || 3000
const server = http.createServer(app)

server.listen(port)
console.log('[api] listening on port :', port)
