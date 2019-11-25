const mongoose = require('mongoose');

var XakalNote = mongoose.model('XakalNote', {
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
    XakalNote: XakalNote
};