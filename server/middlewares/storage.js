const multer = require('multer');
const { v4: uuidv4 } = require('uuid'); //GENERA UN ID ALEATORIO
const path = require('path');
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    await cb(null, 'server/public/uploads/img');
  },
  filename: async function (req, file, cb) {
    await cb(null, uuidv4() + path.extname(file.originalname));
  },
});
const uploadFilter = async function (req, file, cb) {
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
  await cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: uploadFilter,
});

module.exports = upload;
