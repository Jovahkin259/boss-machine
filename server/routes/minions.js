const db = require('../db')
const express = require('express')
const minionsRouter = express.Router()

// Get all minions
minionsRouter.get('/', (req, res, next) => {
  res.send(db.getAllFromDatabase('minions'))
})

const validateMinion = (req, res, next) => {
  const newMinion = req.body
  if (typeof newMinion.name !== 'string' || typeof newMinion.title !== 'string' ||
        typeof newMinion.salary !== 'number') {
    res.status(400).send()
  } else {
    req.newMinion = newMinion
    next()
  }
}

// Create a new minion
minionsRouter.post('/', validateMinion, (req, res, next) => {})
module.exports = minionsRouter
