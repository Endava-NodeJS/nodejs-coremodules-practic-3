const {getVideo, downloadVideo} = require('../../services/video');

module.exports = (app) => {
  app.get('/video', getVideo);
  app.get('/video/download', downloadVideo);
};
