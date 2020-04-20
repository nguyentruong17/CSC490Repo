const { admin, db } = require("../utils/admin");
const config = require("../utils/config");

// Upload a profile image for user
exports.uploadImage = (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");
  const { uuid } = require("uuidv4");

  const busboy = new BusBoy({
    headers: req.headers, //TODO: remove 'Content-Type' if it's in the req.headers
    limits: {
      fileSize: 6 * 1024 * 1024,
    },
  });

  let imageToBeUploaded = {};
  let imageFileName = uuid();
  // String for image token
  let generatedToken = uuid();

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    console.log(fieldname, file, filename, encoding, mimetype);
    if (
      mimetype !== "image/jpeg" &&
      mimetype !== "image/png" &&
      mimetype !== "image/jpg"
    ) {
      return res.status(400).json({ error: "Wrong file type submitted" });
    }

    const imageExtension = filename.split(".").pop();
    imageFileName = `${imageFileName}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName); //because we're doing through cloud environment
    file.on("limit", () => {
      //delete the file that is large in size
      fs.unlink(filepath, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "something went wrong" });
        }
      });
      return res.status(400).json({ error: "File Size Limit Exceeded" });
    });
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
            //Generate token to be appended to imageUrl
            firebaseStorageDownloadTokens: generatedToken,
          },
        },
      })
      .then(() => {
        // Append token to url
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
        return db.doc(`/users/${req.user.email}`).update({ imageUrl });
      })
      .then(() => {
        return res.json({ message: "image uploaded successfully" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: "something went wrong" });
      });
  });
  busboy.end(req.rawBody);
};

exports.updateInfo = (req, res) => {
  const getUpdatedUserInfo = (data = req.body) => {
    let user = {};
    if (data.bio) {
      if (data.bio.trim()) user.bio = data.bio.trim();
    }
    if (data.phoneNumber) {
      if (data.phoneNumber.trim()) user.phoneNumber = data.phoneNumber.trim();
    }

    if (data.name) {
      let name = {};
      if (data.name.first) {
        if (data.name.first.trim()) name.first = data.name.first.trim();
      }
      if (data.name.last) {
        if (data.name.last.trim()) name.last = data.name.last.trim();
      }
      if (Object.keys(name).length > 0) {
        Object.assign(user, name);
      }
    }

    return user;
  };

  db.doc(`/users/${req.user.email}`)
    .update(getUpdatedUserInfo())
    .then(() => {
      return res.json({ message: "User Info Updated" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// Get own user details
exports.getAuthenticatedUser = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.user.email}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        return db
          .collection("likes")
          .where("toEmail", "==", req.user.email)
          .get();
      }
    })
    .then((data) => {
      userData.likes = [];
      data.forEach((doc) => {
        userData.likes.push(doc.data());
      });

      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
