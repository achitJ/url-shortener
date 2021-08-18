const express = require('express');
require('./database/connection');
const urlRouter = require('./database/routers/url');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(urlRouter);

app.listen(port, () => {

    console.log("Server is up on port " + port);

});