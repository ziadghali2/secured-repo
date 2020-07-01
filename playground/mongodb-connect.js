
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017';

const dbName = 'Todos';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  db.getCollection('todos')

  client.close();
});

// MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) => {
//   if (err) {
//     return console.log('Unable to connect to MongoDB server');
//   }
//   console.log('Connected to MongoDB server');
//   client.db('TodoApp')
  // .insertOne({
  //   text: 'Some to do',
  //   completed: false
  // },(err,result) => {
  //   if (err) {
  //     return console.log('Unable to insert Todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops,undefined,2));
  // })
//   db.close()
// })
