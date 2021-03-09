const express = require('express')
const db = require('../db')
const meetingsRouter = express.Router()

// Get all meetings
meetingsRouter.get('/', (req, res, next) => {
  try {
    res.send(db.getAllFromDatabase('meetings'))
  } catch (err) {
    res.status(404).send(err.message)
  }
})

// Create a new meeting
meetingsRouter.post('/', (req, res, next) => {
  const newMeeting = db.addToDatabase('meetings', db.createMeeting())

  if (!newMeeting) {
    res.status(400).send()
  } else {
    res.status(201).send(newMeeting)
  }
})

// Delete all meetings
meetingsRouter.delete('/', (req, res, next) => {
  const success = db.deleteAllFromDatabase('meetings')
  if (!success) {
    res.status(404).send()
  } else {
    res.status(204).send()
  }
})
module.exports = meetingsRouter
