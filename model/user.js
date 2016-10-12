var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) throw err;
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) throw err;
            user.password = hash;
            next();
        })
    });
});

userSchema.methods.comparePassword = function (pw, callback) {
    bcrypt.compare(pw, this.password, function(err, res) {
        if (err) throw err;
        callback(null, res);
    });

};

var userModel = mongoose.model('User', userSchema);

module.exports = userModel;