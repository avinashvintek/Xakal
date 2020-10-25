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
    },
    uploadedBy: {
        type: String
    },
    type: {
        type: String
    },
});
module.exports = {
    StudentLeave: StudentLeave
};