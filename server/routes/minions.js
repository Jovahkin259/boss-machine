const db = require('../db')
const express = require('express')
const minionsRouter = express.Router()

// Match parameters to
minionsRouter.param('minionId', (req, res, next, minionId) => {
  const minion = db.getFromDatabaseById('minions', minionId)
  if (!minion) {
    res.status(404).send()
  } else {
    req.minion = minion
    next()
  }
})

// Validate minions
const validateMinion = (req, res, next) => {
  const validMinion = req.body
  if (typeof validMinion.name === 'string' && typeof validMinion.title === 'string' && typeof validMinion.salary === 'number') {
    next()
  } else {
    res.status(400).send()
  }
}

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
  res.send(req.minion)
})

// Update a minion
minionsRouter.put('/:minionId', (req, res, next) => {
  try {
    const updatedMinion = db.updateInstanceInDatabase('minions', req.body)
    res.send(updatedMinion)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

// Create a new minion
minionsRouter.post('/', validateMinion, (req, res, next) => {
  const newMinion = db.addToDatabase('minions', req.body)

  if (newMinion) {
    res.status(201).send(newMinion)
  } else {
    res.status(400).send()
  }
})
//  Delete a minion
minionsRouter.delete('/:minionId', (req, res, next) => {
  const success = db.deleteFromDatabasebyId('minions', req.params.minionId)
  if (!success) {
    res.status(400).send()
  } else {
    res.status(204).send()
  }
})
module.exports = minionsRouter
