const db = require('../db')
const express = require('express')
const minionsRouter = express.Router()

// Match parameters to
minionsRouter.param('minionId', (req, res, next, id) => {
  const minionId = db.getFromDatabaseById('minions', req.params.minionId)
  if (!minionId) {
    res.status(404).send()
  } else {
    req.minionId = minionId
    next()
  }
})

// Get all minions
minionsRouter.get('/', (req, res, next) => {
  try {
    res.send(db.getAllFromDatabase('minions'))
  } catch (err) {
    res.status(404).send(err.message)
  }
})

// Get a minion by id
minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minionId)
})

// Update a minion

// Create a new minion

//  Delete a minion
module.exports = minionsRouter
