const multer = require('multer');
const { v4: uuidv4 } = require('uuid'); //GENERA UN ID ALEATORIO
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/public/uploads/img');
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;
