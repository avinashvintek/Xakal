const mongoose = require('mongoose');

var User = mongoose.model('User', {
    userID: {
        type: String
    },
    userRole: {
        type: String
    },
    password: {
        type: String
    }
});
module.exports = {
    User: User
};