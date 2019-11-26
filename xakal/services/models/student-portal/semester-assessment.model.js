const mongoose = require('mongoose');

var SemesterDetails = mongoose.model('SemesterDetails', {
    semester: {
        type: String
    },
    course: {
        type: String
    },
    grade: {
        type: String
    },
    result: {
        type: String
    },
});

module.exports = {
    SemesterDetails: SemesterDetails
};