const fs = require('fs');
const path = require('path');

exports.getVideo = async (req, res) => {
  const videoPath = path.resolve(__dirname, '../../../public/flowers.mp4');
  const { size } = fs.statSync(videoPath);
  const headers = {
    'Content-Type': 'video/mp4',
    'Content-Length': size,
  }
  const { range } = req.headers;
  const [start, end] = range.replace('bytes=', '').split('-');
  
  if (range) {
    const newEnd = end || size - 1;
    headers['Content-Length'] = +newEnd - +start + 1;
    headers['Content-Range'] = `bytes ${start}-${newEnd}/${size}`;
    headers['Accept-Ranges'] = `bytes`;
    res.writeHead(206, headers);

    const stream = fs.createReadStream(videoPath, {start: +start, end: +newEnd})
    stream.pipe(res);
  } else {
    res.writeHead(200, headers);
    fs.createReadStream(videoPath).pipe(res);
  }

};
