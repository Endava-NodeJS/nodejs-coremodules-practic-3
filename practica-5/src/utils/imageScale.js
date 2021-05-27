const Jimp = require("jimp");

module.exports = async (buffer, newName, scale = 120) => {
    return new Jimp(buffer, function () {
        this.scaleToFit(scale, scale).write(newName);
    });
}
