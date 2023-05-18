const express = require('express')
const hbs = require('express-handlebars')
const fs = require('node:fs/promises')
const path = require('path')
// const router = express.Router()

const server = express()

// Server configuration
const publicFolder = __dirname + '/public'
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', __dirname + '/views')

const profile = require('./data/data.json')
console.log(profile)

// Your routes/router(s) should go here

server.get('/', (req, res) => {
  const dataPromise = fs.readFile(__dirname + '/data/data.json', 'utf8')
  dataPromise
    .then((json) => {
      const data = JSON.parse(json)
      res.render('home', data)
    })
    .catch((err) => {
      console.log(err)
    })
})

// need to make a route to profile page

module.exports = server
