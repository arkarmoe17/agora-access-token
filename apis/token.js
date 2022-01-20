const express = require('express')
const router = express.Router();
const tokenService = require('../services/tokenService')

const nocache = (req, resp, next) => {
    resp.header('Access-Control-Allow-Origin', '*');
    resp.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    resp.header('Expires', '-1');
    resp.header('Pragma', 'no-cache');
    next();
};

//generate tokens
router
    .route('/rtc')
    .get(nocache,tokenService.generateRtcToken);

router
    .route("/rtm")
    .get(nocache,tokenService.generateRtmToken);

module.exports = router;