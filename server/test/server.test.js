const expect = require('expect')
const request = require('supertest')
const {ObjectID} = require('mongodb')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')
const {todos,populateTodos,users,populateUsers} = require('./seed/seed')

beforeEach(populateUsers)
beforeEach(populateTodos)

describe('POST /todos',() => {
  it('should creat new todo',(done) => {
    var text = 'Test todo text'
    request(app)
    .post('/todos')
    .set('x-auth',users[0].tokens[0].token)
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text)
    })
    .end((err, res) => {
      if (err) {
        return done(err)
      }
      Todo.find({text,
        _creator: users[0]._id
      }).then((todos) => {
        expect(todos.length).toBe(1)
        expect(todos[0].text).toBe(text)
        done()
      }).catch((e) => done(e))
    })
  })
})

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .set('x-auth',users[0].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(1)
    })
    .end((err,res) => {
      if (err) {
        return done(err)
      }
      Todo.find({_creator: users[0]._id}).then((todos) => {
        expect(todos.length).toBe(res.body.todos.length)
        done()
      }).catch((e) => done(e))
    })
  })
})


describe('GET /todos/:id',() => {
  it('should return todo doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .set('x-auth',users[0].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text)
    })
    .end(done)
  })
})

describe('GET /users/me',() => {
  it('should return user if authorized', (done) => {
    request(app)
    .get('/users/me')
    .set('x-auth',users[0].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body._id).toBe(users[0]._id.toHexString())
      expect(res.body.email).toBe(users[0].email)
    })
    .end(done)
  })
})
