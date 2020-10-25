const mongoose = require('mongoose');

var StaffLeave = mongoose.model('StaffLeave', {
    month: {
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
    year: {
        type: Number
    },
    uploadedDate: {
        type: String
    },
    isCancelled: {
        type: Boolean
    }
});
module.exports = {
    StaffLeave: StaffLeave
};