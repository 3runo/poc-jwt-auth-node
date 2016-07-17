const jwt = require('jwt-simple')

const User = require('../models/user')
const apiConfig = require('../config')

function jwtEncodeUserToken (user) {
  const timestamp = new Date().getTime()
  return jwt.encode({
    sub: user.id,
    ait: timestamp
  }, apiConfig.SECRET)
}

module.exports.signup = function signupAction (request, response, next) {
  const email = request.body.email
  const password = request.body.password

  if (!email || !password) {
    response.status(422).send({'error': 'You must provide email and password.'})
  }

  // MongoDB query
  // Looks for existent request
  // Creates a new one, save in MongoDB
  // Returns a JWT token
  User.findOne({email: email}, function findOneCallBack (err, userFound) {
    if (err) {
      return next(err)
    }

    if (userFound) {
      response.status(422).send({'error': 'Email is in use.'})
    }

    const newUser = new User({
      email: email,
      password: password
    })

    newUser.save(function onSavePersistence (err) {
      if (err) {
        return next(err)
      }

      response.send({'token': jwtEncodeUserToken(newUser)})
    })
  })
}

module.exports.signin = function signinAction (request, response, next) {
  // request.user was binded by passport library.
  response.send({'token': jwtEncodeUserToken(request.user)})
}
