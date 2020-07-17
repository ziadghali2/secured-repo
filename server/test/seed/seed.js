
const {ObjectID} = require('mongodb')
const jwt = require('jsonwebtoken')
const {Todo} = require('./../../models/todo')
const {User} = require('./../../models/user')

const userIdOne = new ObjectID()
const userIdTwo = new ObjectID()

const users = [{
  _id: userIdOne,
  email: 'ziadghali5@gmail.com',
  password: 'ziadpassword',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userIdOne, access: 'auth'},process.env.JWT_SECRET).toString()
  }]
},{
  _id: userIdTwo,
  email: 'jen@example.com',
  password: 'jenpassword',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userIdTwo, access: 'auth'},process.env.JWT_SECRET).toString()
  }]
}]

const todos = [{
  _id: new ObjectID(),
  text:'First test todo',
  _creator: userIdOne
},{
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333,
  _creator: userIdTwo
}]

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos)
  }).then(() => done())
}

const populateUsers = (done) => {
  User.remove({}).then(() => {
    return User.insertMany(users)
  }).then(() => done())
}

module.exports = {todos,populateTodos,users,populateUsers}
