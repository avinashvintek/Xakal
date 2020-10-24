const express = require('express');
var router = express.Router();
var { WallPosts } = require('../models/forum/wall-posts-model');
router.get('/', (req, res) => {
    WallPosts.find({}, {}).then((eachOne) => {
        res.json(eachOne)
    })
});

router.post('/', (req, res) => {
    var prdt = new WallPosts({
        postID: req.body.postID,
        userID: req.body.userID,
        fullName: req.body.fullName,
        likes: req.body.likes,
        postedTime: req.body.postedTime,
        caption: req.body.caption,
        likedUsers: [],
        commentsCount: 0,
        collegeName: req.body.collegeName
    });
    prdt.save((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('error in controller')
        }
    });

});

router.put('/updatelikes/:id', (req, res) => {
    var id = req.params.id;
    WallPosts.findOneAndUpdate({ _id: id }, { "likes": req.body.likes, "likedUsers": req.body.likedUsers }, { new: true, }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in controller', err)
        }
    })
});

router.put('/updatecomments/:id', (req, res) => {
    var id = req.params.id;
    WallPosts.findOneAndUpdate({ _id: id }, { "commentsCount": req.body.commentsCount, }, { new: true, }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in controller', err)
        }
    })
});

module.exports = router;