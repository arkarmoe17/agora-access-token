const express = require('express')
const app = express();
const PORT = 8082;

//routers
const tokenRouter = require('./controllers/token');
app.use('/access-token',tokenRouter)

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));