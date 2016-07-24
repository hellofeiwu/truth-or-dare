var mongoose = require('mongoose');

var SessionSchema = new mongoose.Schema({
    id: { 
        type: String
    },
    userId: {
        type: String
    },
    data: {
        type: String
    },
    expiry: {
        type: Date
    }
});

var SessionModel = mongoose.model('Session', SessionSchema);

module.exports = SessionModel;