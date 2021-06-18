const Jimp = require("jimp");
const pathname = require("path")

module.exports = async (buffer, newName, scale = 120) => {
    let path = '/public/user-avatar'
    const image = await Jimp.read(buffer);

    path += `/${newName}`
    await image.scaleToFit(scale, scale).write(pathname.resolve(__dirname, '../../public/user-avatar', newName));

    return path;
}

