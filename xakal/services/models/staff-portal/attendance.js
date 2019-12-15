const mongoose = require('mongoose');

var StaffLeave = mongoose.model('StaffLeave', {
    month: {
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
    },
    year: {
        type: Number
    }
});
module.exports = {
    StaffLeave: StaffLeave
};