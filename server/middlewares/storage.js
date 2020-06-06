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
const uploadFilter = function (req, file, cb) {
  var ext = path.extname(file.originalname);
  if (
    ext !== '.png' &&
    ext !== '.jpg' &&
    ext !== '.gif' &&
    ext !== '.jpeg' &&
    ext != '.svg'
  ) {
    return cb('Error: Debe subir solo imagenes');
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: uploadFilter,
});

module.exports = upload;
