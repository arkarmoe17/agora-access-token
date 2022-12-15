require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')


app.use(cors());
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}));
//api routes
app.use('/access-token', require('./apis/token'));
app.use('/authorization', require('./apis/authorizationToken'));

//start server
const PORT = 8082;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
