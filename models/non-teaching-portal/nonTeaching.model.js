const mongoose = require('mongoose');

var NonTeachingDetails = mongoose.model('NonTeachingDetails', {
    userID: {
        type: String
    },
    name: {
        type: String
    },
    qualification: {
        type: String
    },
    designation: {
        type: String
    },
    email: {
        type: String
    },
    bloodGroup: {
        type: String
    },
    contact: {
        type: Number
    },
    emergencyContact: {
        type: Number
    },
    parentSpouse: {
        type: String
    },
    uploadedBy: {
        type: String
    },
    uploadedDate: {
        type: String
    },
    joiningDate: {
        type: String
    },
    departmentName: {
        type: String
    }
});

module.exports = {
    NonTeachingDetails: NonTeachingDetails
};