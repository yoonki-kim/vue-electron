const uuid = require('uuid')
const crypto = require('crypto')

console.log(uuid.v4())
console.log(crypto.randomBytes(12).toString('hex'))
