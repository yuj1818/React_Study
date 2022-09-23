const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");
let ffmpeg = require("fluent-ffmpeg");


let storage = multer.diskStorage({
    //가져온 파일 어디에 저장할지
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    //파일명
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    //가져올 파일 확장자 제한
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

const upload = multer({storage:storage}).single("file");

//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
    //클라이언트에서 받은 비디오를 서버에 저장
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.fileName})
    })
})

router.post('/uploadVideo', (req, res) => {
    //비디오 정보 저장
    const video = new Video(req.body)
    video.save((err, doc) => {
        if(err) return res.json({ success: false, err })
        res.status(200).json({ success: true })
    })
})

router.get('/getVideos', (req, res) => {
    //비디오를 DB에서 get 하여 클라이언트에 전송
    Video.find()
        .populate('writer') //User의 모든 정보를 가져오기위해 populate 사용
        .exec((err, videos) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success:true, videos })
        })
})

router.get('/getVideoDetail', (req, res) => {
    //비디오 id를 이용하여 그에 맞는 정보를 가져와야 함
    Video.findOne({"_id":req.query.videoId})
        .populate('writer')
        .exec((err, videoDetail) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, videoDetail })
        })
})

router.post('/thumbnail', (req, res) => {
    //썸네일 생성, 비디오 러닝타임 가져오기

    let filePath = ""
    let fileDuration = ""

    ffmpeg.setFfmpegPath('C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe')

    //비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function (err, metadata) {
        console.dir(metadata);
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration
    });

    //썸네일 생성
    ffmpeg(req.body.url)
        //파일명 생성
        .on('filenames', function(filenames) {
            console.log('Will generate ' + filenames.join(', '))
            console.log(filenames)

            filePath = "uploads/thumbnails/" + filenames[0]
        })
        //파일 생성 후 할 것
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, url: filePath, fileDuration: fileDuration});
        })
        //에러 발생 시 할 것
        .on('error', function (err) {
            console.error(err);
            return res.json({ success: false, err });
        })
        //썸네일 3장 저장
        .screenshots({
            count: 3,
            folder: 'uploads/thumbnails',
            size: '320x240',

            filename: 'thumbnail-%b.png'
        })
})

module.exports = router;
