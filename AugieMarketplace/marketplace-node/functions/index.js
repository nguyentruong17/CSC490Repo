const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp()
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions


exports.getItems = functions.https.onRequest((req, res) => {
    admin.firestore().collection('items').get()
        .then( data => {
            let items = []
            data.forEach(doc => {
                items.push(doc.data())
            })

            return res.json(items);
        })
        .catch(err => {
            console.log(err)
        })
})

exports.createItem = functions.https.onRequest((req, res) => {
    const newItem = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: admin.firestore.Timestamp.fromDate(new Date()) 
    }
    admin.firestore()
        .collection('items')
        .add(newItem)
        .then(doc => {
            res.json({ messeage: `document ${doc.id} created successfully`})
        })
        .catch(err => {
            res.status(500).json({ error: 'server went wrong'})
            console.error(err)
        })
})