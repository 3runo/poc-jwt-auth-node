const StrategyJwt = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalPassport = require('passport-local')

const User = require('../models/user')
const apiConfig = require('../config')

// CREATE LOCAL PASSPORT STRATEGY
const localLoginOptions = {
  usernameField: 'email'
}
const localLoginStrategy = new LocalPassport(localLoginOptions, function localLoginDefinition (email, password, done) {
  // MongoDB query
  User.findOne({email: email}, function findOneCallBack (err, userFound) {
    if (err) {
      return done(err, false)
    }
    if (!userFound) {
      return done(null, false)
    }

    // Compare passwords - is 'password' equal to user.password
    userFound.comparePasswords(password, function comparePasswordsCallback (err, isMatch) {
      if (err) {
        return done(err, false)
      }
      if (!isMatch) {
        return done(null, false)
      }
      // When done method is called with 'userFound', passport library adds a reference to all request from our app eq.: request.user or req.user
      return done(null, userFound)
    })
  })
})

// CREATE JWT PASSPORT STRATEGY
const jwtLoginOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: apiConfig.SECRET
}
const jwtLoginStrategy = new StrategyJwt(jwtLoginOptions, function jwtLoginDefinition (payload, done) {
  // * payload is the decoded information, which was defined with user.id and timestamp

  // MongoDB query
  User.findById(payload.sub, function findByIdCallBack (err, userFound) {
    if (err) {
      return done(err, false)
    }

    if (userFound) {
      done(null, userFound)
    } else {
      done(null, false)
    }
  })
})

module.exports.jwtLoginStrategy = jwtLoginStrategy
module.exports.localLoginStrategy = localLoginStrategy
