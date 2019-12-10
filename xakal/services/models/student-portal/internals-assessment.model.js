const mongoose = require('mongoose');

var InternalDetails = mongoose.model('InternalDetails', {
    semester: {
        type: String
    },
    course: {
        type: String
    },
    internals: {
        type: Number
    },
    model1: {
        type: Number
    },
    model2: {
        type: Number
    },
    model3: {
        type: Number
    },
    userID: { type: String }
});

module.exports = {
    InternalDetails: InternalDetails
};