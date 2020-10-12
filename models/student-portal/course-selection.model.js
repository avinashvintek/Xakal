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
    courseCode: {
        type: String
    },
    courseCredits: {
        type: String
    },
    updatedBy: {
        type: String
    },
    updatedDate: {
        type: String
    },
    isElective: {
        type: Boolean
    }
});
module.exports = {
    Course: Course
};