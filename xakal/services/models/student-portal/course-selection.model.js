const mongoose = require('mongoose');

var Course = mongoose.model('Course', {
    semester: {
        type: String
    },
    course: {
        type: String
    },
});
module.exports = {
    Course: Course
};