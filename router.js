const Authentication = require('./controllers/authentication')

module.exports = function routerDefinition (app) {
  app.get('/', function baseRoute (request, response, next) {
    response.send('base')
  })
  app.post('/signup', Authentication.signup)
  // app.get('/signin', Authentication.signin)
}
