const mongoose = require('mongoose');

var Followers = mongoose.model('Followers', {
    followerUserID: {
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
    Followers: Followers
};