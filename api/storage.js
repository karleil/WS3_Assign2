const multer = require('multer'); // middleware used for uploading files

const path = require('path'); // module used for working with file and directory paths


const storage = multer.diskStorage({ // configuration for storing uploaded files
  destination: (req, file, cb) => { // sets the destination for the uploaded files
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => { // generates a unique filename for the uploaded file
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }); // initializes multer with the storage configuration

module.exports = upload; // exports the upload middleware to be used in other files