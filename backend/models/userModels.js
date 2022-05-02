const mongoose = require('mongoose');

//create uset schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart:{
        type: Array,
        default: []
    },
    role:{
        type: String,
        default: 'user'
    },
    avatar: {
        type: String
    }
});
module.exports = mongoose.model('User', userSchema);