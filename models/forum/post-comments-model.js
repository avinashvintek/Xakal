const mongoose = require('mongoose');

var PostComments = mongoose.model('PostComments', {
    postID: {
        type: String
    },
    userID: {
        type: String
    },
    postedTime: {
        type: String
    },
    comments: {
        type: String
    },
});
module.exports = {
    PostComments: PostComments
};