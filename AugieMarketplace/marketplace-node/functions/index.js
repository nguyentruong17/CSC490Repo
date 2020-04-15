const functions = require('firebase-functions');

const express = require('express')
const app = express()
app.use(express.json())

const { getAllItems, postOneItem } = require('./handlers/item')
const { GAuth } = require('./utils/auth')

//items route
app.get('/items', getAllItems)
app.post('/item', GAuth, postOneItem)


// https:/baseurl.com/api/ --> good convention
exports.api = functions.https.onRequest(app);