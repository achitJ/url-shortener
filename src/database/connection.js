const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true, //mongoDB uses ensureIndex() for indexing but it is deprecated in favor to createIndex()
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => {

    console.log("Connected to Database.");

})
.catch((error) => {

    console.log("Could not connect to Database.")

});