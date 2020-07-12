const mongoose = require('mongoose');

var Followings = mongoose.model('Followings', {
    followedUserID: {
        type: String
    },
    userID: {
        type: String
    },
    updatedDate: {
        type: String
    },
    isDeleted: {
        type: Boolean
    }
});
module.exports = {
    Followings: Followings
};