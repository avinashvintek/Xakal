const mongoose = require('mongoose');

var Payment = mongoose.model('Payment', {
    semester: {
        type: String
    },
    description: {
        type: String
    },
    uploadedReceipt: {
        type: String
    },
    paymentDate: {
        type: String
    },
});
module.exports = {
    Payment: Payment
};