const {avatarUpload} = require("../../services/user");
const {checkAuthorization} = require("../../services/auth/middleware");
const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({storage: storage}).single('avatar')

module.exports = (app) => {
    app.post("/avatar-upload", [checkAuthorization, upload], avatarUpload);
};
