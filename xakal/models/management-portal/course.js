const mongoose = require('mongoose');

var DegreeCourseDetails = mongoose.model('DegreeCourseDetails', {
    name: {
        type: String
    },
    duration: {
        type: String
    },
    startingYear: {
        type: Number
    },
    studentCapacity: {
        type: Number
    },
    updatedBy: {
        type: String
    },
    updatedDate: {
        type: String
    },
});
module.exports = {
    DegreeCourseDetails: DegreeCourseDetails
};