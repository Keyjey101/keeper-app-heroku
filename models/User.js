const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    username: {type: String, required: true, uniqie: true},
    password: {type: String, required: true},
    notes: {type: Types.ObjectId, ref: 'Note'}
})

module.exports =  model('User', schema)