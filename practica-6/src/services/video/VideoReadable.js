const {Readable} = require('stream');
const fs = require('fs');

module.exports = class VideoReadable extends Readable {
    constructor({filePath}) {
        super();
        this.index = 0;
        this.fileSize = this.checkFile(filePath);
        this.filePath = filePath;
    }

    _read(chunkSize) {
        if (this.fileSize <= this.index) {
            this.push(null)
            this.emit('end');
        }
        const chunk = fs.readFileSync(this.filePath, {
            start: this.index,
            end: this.index + chunkSize
        })
        if (this.push(chunk)) {
            this.index += chunkSize + 1
        } else {
            this.push(null);
        }
    }

    checkFile(filePath) {
        const {size} = fs.statSync(filePath)
        return size;
    }
}
