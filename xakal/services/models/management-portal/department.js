const mongoose = require('mongoose');

var DepartmentDetails = mongoose.model('DepartmentDetails', {
    name: {
        type: String
    },
    headOfDepartment: {
        type: String
    },
    contact: {
        type: String
    },
    email: {
        type: String
    },
    startingYear: {
        type: Number
    },
    studentCapacity: {
        type: Number
    },
    updatedBy: {
        type: String
    },
    updatedDate: {
        type: String
    },
});
module.exports = {
    DepartmentDetails: DepartmentDetails
};