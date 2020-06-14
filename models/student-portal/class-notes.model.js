const mongoose = require('mongoose');

var ClassNote = mongoose.model('ClassNote', {
    semester: {
        type: String
    },
    course: {
        type: String
    },
    description: {
        type: String
    },
    uploadedBy: {
        type: String
    },
    uploadedFile: {
        type: String
    },
    uploadedDate: {
        type: String
    },
});
module.exports = {
    ClassNote: ClassNote
};