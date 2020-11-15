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
    },
    updatedBy: {
        type: String
    },
    updatedDate: {
        type: String
    },
});
module.exports = {
    User: User
};