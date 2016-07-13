const jwt = require('jwt-simple')

const User = require('../models/user')
const config = require('../config')

exports.signup = function signupAction (request, response, next) {
  const email = request.body.email
  const password = request.body.password

  if (!email || !password) {
    response.status(422).send({'error': 'You must provide email and password.'})
  }

  // Mongo query
  User.findOne({email: email}, function whenFindEnds (err, userFound) {
    if (err) {
      return next(err)
    }

    if (userFound) {
      response.status(422).send({'error': 'Email is in use.'})
    }

    const user = new User({
      email: email,
      password: password
    })

    user.save(function onSavePersistence (err) {
      if (err) {
        return next(err)
      }

      response.send({'token': jwtEncodeUserToken(user)})
    })
  })
}

function jwtEncodeUserToken (user) {
  const timestamp = new Date().getTime()
  return jwt.encode({
    sub: user.id,
    ait: timestamp
  }, config.API_SECRET)
}

// exports.signup = function signinAction (request, response, next) {
//   response.send('signinAction')
// }
