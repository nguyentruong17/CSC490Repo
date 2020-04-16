const { db } = require('../utils/admin')

//these should have been in one route with expresss route?
exports.getAllItems = (req, res) => {
    db
        .collection('items')
        .orderBy('createdAt', 'desc')
        .get()
        .then( data => {
            let items = []
            data.forEach(doc => {
                items.push({
                    itemId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt

                })
            })

            return res.json(items);
        })
        .catch(err => {
            res.status(500).json({ error: 'server went wrong'})
            console.error(err)
        })
}


exports.postOneItem = (req, res) => {
    const newItem = {
        body: req.body.body,
        userHandle: req.user.email,
        createdAt: new Date().toISOString() 
    }
    db
        .collection('items')
        .add(newItem)
        .then(doc => {
            res.json({ messeage: `document ${doc.id} created successfully`})
        })
        .catch(err => {
            res.status(500).json({ error: 'server went wrong'})
            console.error(err)
        })
}