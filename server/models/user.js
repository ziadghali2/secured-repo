
const mongoose = require('mongoose')
const validator = require('validator')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email is required'],
    minLength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value)
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    require: [true, 'password is required'],
    minlength: 6,
  },
  tokens: [{
    access: {
      type: String,
      require: [true, 'access is required'],
    },
    token: {
      type: String,
      require: [true, 'token is required'],
    }
  }]
})

UserSchema.pre('save', function (next) {
  var user = this
  if (user.isModified('password')) {
    bcrypt.genSalt(10,(err,salt) => {
      bcrypt.hash(user.password,salt,(err,hash) => {
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

UserSchema.methods.toJSON = function () {
    var user = this
    var userObject = user.toObject()
    return _.pick(userObject, ['_id','email'])
}

UserSchema.methods.generateAuthToken = function () {
  var user = this
  var access = 'auth'
  var token = jwt.sign({_id: user._id.toHexString(), access},process.env.JWT_SECRET).toString()
  user.tokens.push({access, token})
  return user.save().then(() => token)
}
UserSchema.methods.removeToken = function (token) {
  var user = this
  return user.update({
    $pull: {
      tokens: {
        token: token
      }
    }
  })
}
UserSchema.statics.findByToken = function (token) {
  var User = this
  var decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (e) {
    console.log('Ziad -> Error:',e);
    return Promise.reject()
  }
  return User.findOne({
    '_id':decoded._id,
    'tokens.token':token,
    'tokens.access':'auth'
  })
}
var User = mongoose.model('User', UserSchema)

module.exports = {User}
