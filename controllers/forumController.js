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

router.put('/updatelikes/:id', (req, res) => {
    var id = req.params.id;
    console.log(req, res.body)
    // WallPosts.find({}).snapshot().forEach(element => {
    WallPosts.findOneAndUpdate({ _id: id }, { "likes": req.body.likes }, { new: true, }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in controller', err)
        }
    })

});
module.exports = router;