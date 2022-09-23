const express = require('express');
const router = express.Router();
const { Subscriber } = require("../models/Subscriber");

//=================================
//             Subscribe
//=================================

router.get('/subscribeNumber', (req, res) => {
    //userID를 variable로 받아 해당 id의 구독자 수 받아옴
    Subscriber.find({ 'userTo': req.query.userTo })
        .exec((err, subscribe) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success:true, subscribeNumber:subscribe.length})
        })
})

module.exports = router;
