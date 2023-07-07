const multer = require ('multer');
const path = require ('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/avatars');
    },
    filename: (req, file, cb) => {
        let fileName = Date.now() + '-' + path.extname(file.originalname);
        cb(null, fileName);
    }
})

const uploadFileAliado = multer ({storage});

module.exports = uploadFileAliado;