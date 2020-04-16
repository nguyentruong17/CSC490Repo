const { admin, db } = require("../utils/admin");
const config  = require("../utils/config");


// Upload a profile image for user
exports.uploadImage = (req, res) => {
    const BusBoy = require("busboy");
    const path = require("path");
    const os = require("os");
    const fs = require("fs");
    const { uuid } = require("uuidv4");
  
    const busboy = new BusBoy({ headers: req.headers, //TODO: remove 'Content-Type' if it's in the req.headers
      limits: {
        fileSize: 6*1024*1024
      }
    }); 
  
    let imageToBeUploaded = {};
    let imageFileName = uuid();
    // String for image token
    let generatedToken = uuid();
  
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      console.log(fieldname, file, filename, encoding, mimetype);
      if (mimetype !== "image/jpeg" 
      && mimetype !== "image/png"
      && mimetype !== "image/jpg"
      ) {
        return res.status(400).json({ error: "Wrong file type submitted" });
      }
      
      // file.on('limit', () => {
      //   return res.status(400).json({ error: "File Size Limit Exceeded: 6MB max" });
      // });

      const imageExtension = filename.split(".").pop()
      imageFileName = `${imageFileName}.${imageExtension}`;
      const filepath = path.join(os.tmpdir(), imageFileName); //because we're doing through cloud environment
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
  
