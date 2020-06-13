const mongoose = require('mongoose');

var QuestionPaper = mongoose.model('QuestionPaper', {
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
    QuestionPaper: QuestionPaper
};