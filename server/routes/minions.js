import { getAllFromDatabase } from 'db.js'
const express = require('express')
const minionsRouter = express.Router()

// Get all minions
minionsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('minions'))
})

// Create a new minion

module.exports = minionsRouter
