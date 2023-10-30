const mongoose = require('mongoose');

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE   } = process.env

const MONGODB_URL = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;


mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true, 
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));