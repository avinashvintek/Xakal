const express = require('express');
var router = express.Router();
var { PostComments } = require('../models/forum/post-comments-model')

router.post('/', (req, res) => {
    var prdt = new PostComments({
        postID: req.body.postID,
        userID: req.body.userID,
        postedTime: req.body.postedTime,
        comments: req.body.comments,
    });
    prdt.save((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('error in controller')
        }
    });

});
module.exports = router;