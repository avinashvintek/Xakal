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
        userID: req.body.userID,
        fullName: req.body.fullName,
        likes: req.body.likes,
        postedTime: req.body.postedTime,
        caption: req.body.caption,
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