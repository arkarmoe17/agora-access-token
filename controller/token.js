// const APP_ID = process.env.APP_ID;
// const APP_CERTIFICATE = process.env.APP_CERTIFICATE;
const APP_ID = "a9f258b08ac5401b90921548cc7a2b51";
const APP_CERTIFICATE = "2f6b9d09a7f24f49af2efa658c95627d";
const {RtcRole, RtcTokenBuilder, RtmTokenBuilder, RtmRole} = require("agora-access-token");

//generate RTC token
function generateRtcToken(req,resp){
    const channelName = req.query.channelName;
    if (!channelName) return resp.status(500).json({'error': 'channel is required'});

    // get uid
    let uid = req.query.uid;
    if (!uid || uid === '') uid = 0;

    //get account
    let account = req.query.account;
    console.log("Account:{}",account)

    // get role
    let role = RtcRole.PUBLISHER;
    if (req.query.role === 'subscriber') role = RtcRole.SUBSCRIBER;

    // get expire time
    let expireTime = req.query.expireTime;
    if (!expireTime || expireTime === '') expireTime = 3600;
    else expireTime = parseInt(expireTime, 10);

    // calculate privilege expire time
    const currentTime = Math.floor(Date.now() / 1000);
    console.log("Current Time:",currentTime);
    const privilegeExpireTime = currentTime + expireTime;
    console.log("PrivilegeExpireTime:",privilegeExpireTime);

    //build token with Uid
    const tokenUid = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);
    let tokenAccount= "";
    if(account) tokenAccount = RtcTokenBuilder.buildTokenWithAccount(APP_ID, APP_CERTIFICATE, channelName, account, role, privilegeExpireTime);
    console.log("Token With Uid: " , tokenUid);
    console.log("Token With UserAccount: " , tokenAccount);

    return resp.json({'tokenUid': tokenUid,'tokenAccount':tokenAccount});
}

//generate RTM token
function generateRtmToken(req,resp){
    // get expire time
    let expireTime = req.query.expireTime;
    if (!expireTime || expireTime === '') expireTime = 3600;
    else expireTime = parseInt(expireTime, 10);

    const currentTimestamp = Math.floor(Date.now() / 1000)
    const privilegeExpiredTs = currentTimestamp + expireTime
    let account = req.query.account;
    if (!account || account === '') {
        return resp.status(400).json({ 'error': 'account is required' }).send();
    }
    const key = RtmTokenBuilder.buildToken(APP_ID, APP_CERTIFICATE, account, RtmRole.PUBLISHER, privilegeExpiredTs);
    return resp.json({ 'token': key }).send();
}

module.exports = {generateRtmToken,generateRtcToken}