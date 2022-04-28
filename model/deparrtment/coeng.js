const mongoose = require('mongoose')
const coengSchema = mongoose.Schema({
    email: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    output: {type: String, required: true},
    details: {type: String, required: true},
    verify: {type: String, required: true},
    department: {type: String, required: true},
},
{collection: 'COENG'})

const model = mongoose.model('coengSchema', coengSchema)
module.exports = model

