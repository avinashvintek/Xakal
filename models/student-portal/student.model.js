const mongoose = require('mongoose');

var StudentDetails = mongoose.model('StudentDetails', {
    userID: {
        type: String
    },
    name: {
        type: String
    },
    course: {
        type: String
    },
    branch: {
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
    parentName: {
        type: String
    },
    admissionDate: {
        type: String
    },
    admissionYear: {
        type: Number
    },
    updatedBy: {
        type: String
    },
    updatedDate: {
        type: String
    },
    gender: {
        type: String
    },
    motherTongue: {
        type: String
    },
    address: {
        type: String
    },
    dob: {
        type: String
    },

});

module.exports = {
    StudentDetails: StudentDetails
};