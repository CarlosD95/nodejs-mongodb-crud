const mongoose = require('mongoose');

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE   } = process.env

const MONGODB_URL = `${process.env.MONGO_URL}`;


mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true, 
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));