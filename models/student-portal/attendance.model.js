const mongoose = require('mongoose');

var StudentLeave = mongoose.model('StudentLeave', {
    semester: {
        type: String
    },
    fromDate: {
        type: String
    },
    toDate: {
        type: String
    },
    reason: {
        type: String
    },
    userID: {
        type: String
    },
    uploadedDate: {
        type: String
    },
    isCancelled: {
        type: Boolean
    }
});
module.exports = {
    StudentLeave: StudentLeave
};