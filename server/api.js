const minionsRouter = require('./routes/minions')
const ideasRouter = require('./routes/ideas')
const meetingsRouter = require('./routes/meetings')
const express = require('express')
const apiRouter = express.Router()

// minions router
apiRouter.use('/minions', minionsRouter)
// ideas router
apiRouter.use('/ideas', ideasRouter)
// meetings router
apiRouter.use('/meetings', meetingsRouter)

module.exports = apiRouter
