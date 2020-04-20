const { db } = require("../utils/admin");
const {
  validateUpdateOneItem,
  validatePostOneItem,
} = require("../utils/validators");

//these should have been in one route with expresss route?
exports.getAllItems = (req, res) => {
  db.collection("items")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let items = [];
      data.forEach((doc) => {
        items.push({
          itemId: doc.id,
          body: doc.data().body,
          userEmail: doc.data().userEmail,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(items);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "server went wrong" });
    });
};

exports.postOneItem = (req, res) => {
  const errors = validatePostOneItem(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ "Bad Request": errors });
  }

  const newItem = {
    body: req.body,
    isAvailable: true,
    userEmail: req.user.email,
    createdAt: new Date().toISOString(),
  };

  db.collection("items")
    .add(newItem)
    .then((doc) => {
      return res.json({ messeage: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "server went wrong" });
    });
};

exports.getOneItem = (req, res) => {
  let itemData = {};
  db.doc(`/items/${req.params.itemId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Item not found" });
      }
      itemData = doc.data();
      itemData.itemId = req.params.itemId;
      return db
        .collection("comments")
        .orderBy("createdAd", "asc")
        .where("itemId", "==", doc.id, itemData.itemId)
        .get();
    })
    .then((data) => {
      itemData.comments = [];
      data.forEach((doc) => {
        itemData.comments.push(doc.data());
      });
      return res.json(itemData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.updateOneItem = (req, res) => {
  const errors = validateUpdateOneItem(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ "Bad Request": errors });
  }

  const getUpdatedItemBody = (data = req.body) => {
    let body = {};
    
    if (data.name) {
      body.name = data.name.trim();
    }

    if (data.price) {
        body.price = data.price;
    }

    if (data.description) {
      body.description = data.description.trim();
    }

    if (data.condition) {
      body.condition = data.condition.trim();
    }


    return body;
  };

  const getUpdatedItem = (data = req.body) => {
      console.error(data)
      let item = {}
      item.body = getUpdatedItemBody()
      
      if ('isAvailable' in data) {
        item.isAvailable = data.isAvailable;
      }

      return item

  }

  
  db.doc(`/items/${req.params.itemId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Item not found" });
      }
      const itemData = doc.data();
      const updatedItem = getUpdatedItem()

      const newBody = Object.assign(itemData.body, updatedItem.body)

      let finalItem = Object.assign(itemData, updatedItem)
      finalItem.body = newBody

      return finalItem
    })
    .then(itemToBeUpdated => {
        return db.doc(`/items/${req.params.itemId}`)
                .update(itemToBeUpdated)
    })
    .then(() => {
      return res.json({ message: "Item Info Updated" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.deleteOneItem = (req, res) => {
  const document = db.doc(`/items/${req.params.itemId}`)
  document.get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Item not found" });
      }
      if (doc.data().userEmail !== req.user.email) {
        return res.status(403).json({ error: "Unauthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Item deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

//TODO: get all items from an email
