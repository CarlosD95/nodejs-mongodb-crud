const mongoose = require('mongoose');

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE   } = process.env

const DB_URI = process.env.DB_URI;


mongoose.connect(DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true, 
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));