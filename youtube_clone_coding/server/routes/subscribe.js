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

router.get('/subscribed', (req, res) => {
    Subscriber.find({ 'userTo': req.query.userTo, 'userFrom': req.query.userFrom })
        .exec((err, subscribe) => {
            if(err) return res.status(400).send(err)
            let result = false
            if (subscribe.length != 0) {
                result = true
            }
            res.status(200).json({success: true, subscribed: result})
        })
})

router.post('/unSubscribe', (req, res) => {
    Subscriber.findOneAndDelete({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom})
        .exec((err, doc) => {
            if(err) return res.status(400).json({success: false, err})
            return res.status(200).json({success: true, doc})
        })
})

router.post('/subscribe', (req, res) => {
    const subscribe = new Subscriber(req.body)

    subscribe.save((err, doc) => {
        if(err) return res.status(400).json({success: false, err})
        return res.status(200).json({ success: true })
    })
})

module.exports = router;
