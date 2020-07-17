
const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

var user = new User({
  email: 'ziadghali2@gmail.com'
})
user.save().then((users) => {
  console.log(users)
},(e) => {
  console.log(e);
})
var id = '5efd996b707a5032be0a049e'
if (!ObjectID.isValid(id)) {
  console.log('ID not valid');
}
Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
})

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo', todo);
})

Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo by Id', todo);
}).catch((e) => console.log(e))
