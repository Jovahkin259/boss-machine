const minionsRouter = require('./routes/minions')
const express = require('express')
const apiRouter = express.Router()

// minions router
apiRouter.use('/minions', minionsRouter)
// ideas router

// meetings router
module.exports = apiRouter
