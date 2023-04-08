const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);// Que solo sean archivos csv
    }
});

const upload = multer({ storage });

const uploadFile = upload.single("file");

module.exports = uploadFile;
