const passport = require('passport')
const StrategyJwt = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const User = require('../models/user')
const config = require('../config')

// Setup options for JWT Strategy
const jwtOptions = {}

// Create JWT Strategy
const jwtLogin = new StrategyJwt(jwtOptions, function jwtLoginDefinition (payload, done) {
  User.findById(payload.sub, function name (err, userFound) {
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
// Tell passport to use such Strategy
