const { User } = require('../models/User');

let auth = (req, res, next) => {
    //인증 처리
    //클라이언트 쿠키에서 토큰 가져옴
    let token = req.cookies.x_auth;

    //토큰 복호화 후, user 찾음
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true })

        req.token = token;
        req.user = user;
        next();
    })

    //user가 존재하면 인증 O

    //존재하지 않으면 인증 X
}

module.exports = { auth };