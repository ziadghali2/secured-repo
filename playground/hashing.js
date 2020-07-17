
const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

var password = '123abc!'
bcrypt.genSalt(10,(err,salt) => {
  console.log(salt);
  bcrypt.hash(password,salt,(err,hash) => {
    console.log(hash);
  })
})

var hashedPassword = '$2b$10$D48zxyfg6EK/K7xm3jzTF.t6E/Yp5ebwJ9Ev2rULlhI.EAUSkJGpW'
bcrypt.compare(password,hashedPassword,(err,res) => {
  console.log(res);
})

// var data = {
//   id: 10
// }
// var token = jwt.sign(data,'123abc')
// var decoded = jwt.verify(token, '123abc')
//
// console.log(token);
// console.log('decoded',decoded);

// var message = 'I am Ziad'
// var hash = SHA256(message).toString()
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id: 4
// }
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()
// token.data.id = 5
// token.hash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()
//
// if (resultHash === token.hash) {
//   console.log('data is not change');
// } else {
//   console.log('data is changed');
// }
