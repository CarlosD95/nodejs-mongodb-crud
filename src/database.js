const mongoose = require('mongoose');

const { NOTES_APP_MONGODB_USER, NOTES_APP_MONGODB_PASSWORD, NOTES_APP_MONGODB_HOST, PORT } = process.env

mongoose.connect(`mongodb://${NOTES_APP_MONGODB_USER}:${NOTES_APP_MONGODB_PASSWORD}@${NOTES_APP_MONGODB_HOST}:${PORT}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true, 
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));