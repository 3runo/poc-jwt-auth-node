const passport = require('passport')

const Authentication = require('./controllers/authentication')
const Base = require('./controllers/base')
const jwtLoginStrategy = require('./services/passport').jwtLoginStrategy
const localLoginStrategy = require('./services/passport').localLoginStrategy

// Tell passport to use such passport strategies
passport.use(jwtLoginStrategy)
passport.use(localLoginStrategy)

const requirePassportJwtAuth = passport.authenticate('jwt', { session: false })
const requirePassportLocalAuth = passport.authenticate('local', { session: false })

module.exports = function routerDefinition (app) {
  app.get('/', requirePassportJwtAuth, Base.home)
  app.post('/signup', Authentication.signup)
  app.post('/signin', requirePassportLocalAuth, Authentication.signin)
}
