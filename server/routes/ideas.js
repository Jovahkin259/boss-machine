const express = require('express')
const ideasRouter = express.Router()
const db = require('../db')
const checkMillionDollarIdea = require('../checkMillionDollarIdea')

// Check matching id parameters
ideasRouter.param('ideaId', (req, res, next, ideaId) => {
  const idea = db.getFromDatabaseById('ideas', ideaId)

  if (!idea) {
    res.status(404).send()
  } else {
    req.idea = idea
    next()
  }
})

// Get all ideas
ideasRouter.get('/', (req, res, next) => {
  try {
    res.send(db.getAllFromDatabase('ideas'))
  } catch (err) {
    res.status(404).send(err)
  }
})

// Get idea by id
ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.idea)
})

// Update an idea by id
ideasRouter.put('/:ideaId', (req, res, next) => {
  const updatedIdea = db.updateInstanceInDatabase('ideas', req.body)

  if (updatedIdea) {
    res.send(updatedIdea)
  } else {
    res.status(404).send()
  }
})

// Create a new idea
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const newIdea = db.addToDatabase('ideas', req.body)
  if (!newIdea) {
    res.status(400).send()
  } else {
    res.status(201).send(newIdea)
  }
})

// Delete an idea
ideasRouter.delete('/:ideaId', (req, res, next) => {
  const success = db.deleteFromDatabasebyId('ideas', req.params.ideaId)
  if (!success) {
    res.status(400).send()
  } else {
    res.status(204).send()
  }
})

module.exports = ideasRouter
