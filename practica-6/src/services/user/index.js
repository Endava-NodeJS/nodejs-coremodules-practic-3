const bcrypt = require('bcrypt');
const sizeOf = require("image-size");
const db = require("../../models");
const {IMAGE_TYPES} = require("../../constants");
const imageScale = require("../../utils/imageScale");
const Users = db.users;

exports.avatarUpload = async (req, res) => {
    const {
        file: {mimetype, size, buffer},
        user: {username, id},
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

    try {
        const hash = Date.now()
        const imagePath = await imageScale(buffer, `${hash}.jpeg`);

        await Users.update({avatar: imagePath}, {where: {id}, returning: true});

        const user = await Users.findOne({where: {id}});

        res.status(200).json(user);


    } catch (error) {
        console.trace(error)
        res.status(500);
        res.end('Internal server error!')
    }

};
