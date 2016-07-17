const passport = require('passport')

const Authentication = require('./controllers/authentication')
const Base = require('./controllers/base')
const passportService = require('./services/passport') // Just to get the scope, because './services/passport' doesn't exports anything

const requirePassportJwtAuth = passport.authenticate('jwt', { session: false })
const requirePassportLocalAuth = passport.authenticate('local', { session: false })

module.exports = function routerDefinition (app) {
  app.get('/', requirePassportJwtAuth, Base.home)
  app.post('/signup', Authentication.signup)
  app.post('/signin', requirePassportLocalAuth, Authentication.signin)
}
