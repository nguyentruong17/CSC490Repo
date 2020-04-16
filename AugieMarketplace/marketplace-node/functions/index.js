const functions = require('firebase-functions');

const express = require('express')
const app = express()

const { GAuth } = require('./utils/auth')
const { getAllItems, postOneItem } = require('./handlers/items')
const { uploadImage } = require('./handlers/users')


//items route
app.get('/items', getAllItems)
app.post('/item', GAuth, postOneItem)

// users routes
app.post('/user/image', GAuth, uploadImage);


// https:/baseurl.com/api/ --> good convention
exports.api = functions.https.onRequest(app);