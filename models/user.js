const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Definig an ORM schema for our "user" entity
const userSchema = new Schema({
  email: {type: String, unique: true, lowecase: true},
  password: String
})

// Adding an event before mongoose.save method execute
// Hashs user password
userSchema.pre('save', function beforeExecuteSaveMethod (next) {
  const user = this

  bcrypt.genSalt(10, function onSaltCreation (err, salt) {
    if (err) {
      return next(err)
    }

    bcrypt.hash(user.password, salt, null, function onHashCreation (err, hash) {
      if (err) {
        return next(err)
      }

      user.password = hash
      next()
    })
  })
})

// Adding function to 'userSchema' like Object.prototype.fn
userSchema.methods.comparePasswords = function comparePasswordsDefinition (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function bcryptCompareResult (err, isMatch) {
    if (err) {
      return callback(err)
    }

    return callback(null, isMatch)
  })
}

// Create the model class, with user collection and userSchema
const User = mongoose.model('user', userSchema)

module.exports = User
