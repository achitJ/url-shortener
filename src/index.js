const express = require('express');
require('./database/connection');
const urlRouter = require('./database/routers/url');
const path = require('path');

const app = express();
const port = process.env.PORT;

app.use(express.json());

const publicDirPath = path.join(__dirname, './public');

app.use(express.static(publicDirPath));

app.get('', (req, res) => {

    res.sendFile(path.join(publicDirPath, '/html/index.html'))

})

app.use(urlRouter);

app.listen(port, () => {

    console.log("Server is up on port " + port);

});