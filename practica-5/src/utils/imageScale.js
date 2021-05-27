const Jimp = require("jimp");
const pathname = require("path")

module.exports = async (buffer, newName, scale = 120) => {
    let path = '/public/user-avatar'
    new Jimp(buffer, (error, image) => {
        if (error) {
            path = '';
            return
        }
        path+=`/${newName}`
        image.scaleToFit(scale, scale).write(pathname.resolve(__dirname,'/public/user-avatar' ,newName));
    });
    return path;
}
