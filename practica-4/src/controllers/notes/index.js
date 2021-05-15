const {getNotes} = require('../../services/notes');
const {checkAuthorization} = require('../../services/auth/middleware')

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });


  app.get('/notes', [checkAuthorization], getNotes);
};
