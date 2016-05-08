var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: { 
        type: String
    },
    password: {
        type: String
    }
});

var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;