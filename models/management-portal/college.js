const mongoose = require('mongoose');

var CollegeDetails = mongoose.model('CollegeDetails', {
    name: {
        type: String
    },
    collegeCode: {
        type: String
    },
    address: {
        type: String
    },
    contact: {
        type: String
    },
    email: {
        type: String
    },
    awards: {
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
    CollegeDetails: CollegeDetails
};