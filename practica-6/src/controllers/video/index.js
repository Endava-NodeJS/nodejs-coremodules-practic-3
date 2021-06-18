const {getVideo} = require('../../services/video');

module.exports = (app) => {
  app.get('/video', getVideo);
};
