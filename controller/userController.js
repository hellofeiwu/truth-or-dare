'use strict';

var userModel = require('../model/user');
var jwt = require('jsonwebtoken');
var CONF = require('../config');

/**
 * Generate JWT Token
 * @param user
 * @returns {string}
 */
function generateToken (user) {
    return jwt.sign(
        user,
        CONF.secret,
        {
            expiresIn: 864000 // 10 days
        }
    );
}

var userController = {
    register: function(req, res) {
        var user = new userModel({
            username: 'test',
            password: '123',
            role: 'admin',
            apikey: 'haha'
        });

        user.save(function(err) {
            if (err) throw err;
            console.log('user created!');
            res.send(user);
        });
    },
    login: function(req, res) {
        userModel.findOne(
            {username: req.body.username},
            function (err, user) {
                if (err) throw err;
                if (!user) {
                    return res.status(401).send('User not found.');
                }

                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (isMatch && !err) {
                        res.send({
                            token: 'JWT ' + generateToken(user),
                            role: user.role
                        });
                    }else {
                        res.status(403).send('Passwords did not match.');
                    }
                });
            }
        );
    }
};

module.exports = userController;