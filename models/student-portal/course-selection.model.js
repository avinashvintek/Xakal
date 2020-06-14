const mongoose = require('mongoose');

var Course = mongoose.model('Course', {
    semester: {
        type: String
    },
    course: {
        type: String
    },
    department: {
        type: String
    },
    degree: {
        type: String
    },
    updatedBy: {
        type: String
    },
    updatedDate: {
        type: String
    },

});
module.exports = {
    Course: Course
};