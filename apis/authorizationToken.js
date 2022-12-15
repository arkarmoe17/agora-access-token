const express = require('express')
const authorizationService = require("../services/authorizationService");
const router = express.Router();

const nocache = (req, resp, next) => {
    resp.header('Access-Control-Allow-Origin', '*');
    resp.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    resp.header('Expires', '-1');
    resp.header('Pragma', 'no-cache');
    next();
};

//generate tokens
router
    .route('/token')
    .post(nocache,authorizationService.authorizationRTMToken);

module.exports = router;