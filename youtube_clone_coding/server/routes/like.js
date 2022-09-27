const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike")

//=================================
//             Like
//=================================

router.get('/getLikes', (req, res) => {
    let variable = {}
    if(req.query.videoId) {
        variable = { videoId: req.query.videoId }
    } else {
        variable = { commentId: req.query.commentId }
    }
    Like.find(variable)
        .exec((err, likes) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success:true, likes })
        })
})

router.get('/getDislikes', (req, res) => {
    let variable = {}
    if(req.query.videoId) {
        variable = { videoId: req.query.videoId }
    } else {
        variable = { commentId: req.query.commentId }
    }
    Dislike.find(variable)
        .exec((err, dislikes) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success:true, dislikes })
        })
})

router.post('/upLike', (req, res) => {
    let variable = {}
    if(req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    //Like collection에 클릭 정보 넣어주기
    const like = new Like(variable)
    like.save((err, likeResult) => {
        if(err) return res.json({ success:false, err })
        //이미 Dislike이 클릭되어 있을 때, Dislike 1 줄이기
        Dislike.findOneAndDelete(variable)
            .exec((err, dislikeResult) => {
                if(err) return res.status(400).json({ success:false, err })
                res.status(200).json({ success:true })
            })
    })

})

router.post('/unLike', (req, res) => {
    let variable = {}
    if(req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    Like.findOneAndDelete(variable)
        .exec((err, result)=> {
            if(err) return res.status(400).json({ success:false, err })
            res.status(200).json({ success:true })
        })

})

router.post('/upDislike', (req, res) => {
    let variable = {}
    if(req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    //Dislike collection에 클릭 정보 넣어주기
    const dislike = new Dislike(variable)
    dislike.save((err, dislikeResult) => {
        if(err) return res.json({ success:false, err })
        //이미 Like이 클릭되어 있을 때, Like 1 줄이기
        Like.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                if(err) return res.status(400).json({ success:false, err })
                res.status(200).json({ success:true })
            })
    })

})

router.post('/unDislike', (req, res) => {
    let variable = {}
    if(req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    Dislike.findOneAndDelete(variable)
        .exec((err, result)=> {
            if(err) return res.status(400).json({ success:false, err })
            res.status(200).json({ success:true })
        })

})

module.exports = router;
