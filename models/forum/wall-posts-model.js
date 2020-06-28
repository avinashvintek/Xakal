const mongoose = require('mongoose');

var WallPosts = mongoose.model('WallPosts', {
    userID: {
        type: String
    },
    fullName: {
        type: String
    },
    likes: {
        type: Number
    },
    postedTime: {
        type: String
    },
    caption: {
        type: String
    },
});
module.exports = {
    WallPosts: WallPosts
};