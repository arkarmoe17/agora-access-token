const Joi = require('joi');
const https = require('https')
const { APP_ID } = process.env;

//Authorization RTM Token
function authorizationRTMToken(req, resp) {
    const token = req.query.token;
    const uid = req.query.uid;

    // Set request parameters
    const options = {
        hostname: 'api.agora.io',
        port: 443,
        path: '/dev/v2/project/' + APP_ID + '/rtm/vendor/user_events',
        method: 'GET',
        headers: {
            'x-agora-token': token,
            'x-agora-uid': uid,
            'Content-Type': 'application/json'
        }
    }
    let message = "";
    req = https.request(options, res => {
        console.log(`Status code: ${res.statusCode}`)
        console.log("options:", options)
        res.on('data', d => {
            message += d;
            // process.stdout.write(d);
        }).on('end', () => {
            console.log("message:", message);
            return resp.status(200).json(JSON.parse(message));
        })
    })
    req.on('error', error => {
        console.error("error:{}", error)
    })
    req.end()

}

//validate course
function validateReqBody(req) {
    const schema = Joi.object({
        token: Joi.string().min(3).required(),
        uid: Joi.string().required()
    })
    return schema.validate(req);
}

module.exports = {authorizationRTMToken}