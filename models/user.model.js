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
    },
    collegeCode: {
        type: String
    },
    collegeName: {
        type: String
    },
    registerNr: {
        type: Number | null
    }
});
module.exports = {
    User: User
};