const mongoose = require('mongoose');

var SalaryDetails = mongoose.model('SalaryDetails', {
    salaryStatus: {
        type: String
    },
    creditedDate: {
        type: String
    },
    salaryReceipt: {
        type: String
    },
    userID: {
        type: String
    },
    salaryMonth: {
        type: String
    },
    salaryYear: {
        type: Number
    }
});
module.exports = {
    SalaryDetails: SalaryDetails
};