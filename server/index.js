const express = require('express');
require('./db/database');
const urlRouter = require('./routers/url');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(urlRouter);

app.listen(port, () => {

    console.log("Server is up on port " + port);

});