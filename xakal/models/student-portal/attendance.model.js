const mongoose = require('mongoose');

var StudentLeave = mongoose.model('StudentLeave', {
    semester: {
        type: String
    },
    leaveDate: {
        type: String
    },
    reason: {
        type: String
    },
    userID: {
        type: String
    }
});
module.exports = {
    StudentLeave: StudentLeave
};