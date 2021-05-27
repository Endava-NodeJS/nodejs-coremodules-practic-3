const bcrypt = require('bcrypt');
const sizeOf = require("image-size");
const db = require("../../models");
const {IMAGE_TYPES} = require("../../constants");
const imageScale = require("../../utils/imageScale");
const Users = db.users;

exports.avatarUpload = async (req, res) => {
    const {
        file: {mimetype, size, buffer},
        user: {userName},
    } = req;

    const {height, width} = sizeOf(buffer);
    const [type, format] = mimetype.split("/");
    const errors = [];

    if (!IMAGE_TYPES.includes(format)) {
        errors.push("Image format should be PNG or JPG");
    }

    if (size > 1e6) {
        errors.push("Image size is too big");
    }

    if (width > 1500 || height > 1500) {
        errors.push("Image dimensions are too big. Must not exceed 1500x1500px");
    }

    console.log('errors', errors);

    if (errors.length) {
        res.status(400);
        res.json({message: "Bad Request", type: "Validation Error", errors});
        return;
    }

    const hash = bcrypt.hashSync(userName, 8);

    try {
        const newImage = await imageScale(buffer, `${hash}.jpeg`);

    } catch (error) {
        res.status(500);
        res.end('Internal server error!')
    }

};
