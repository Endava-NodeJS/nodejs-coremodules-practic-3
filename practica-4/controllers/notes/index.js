const db = require("../../models");
const {checkAuthorization} = require('../auth/middleware')

const Notes = db.notes;

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });



  app.get("/notes", [checkAuthorization],async (req, res) => {
    try {
      const notes = await Notes.findAll();
      res.status(200).json(notes);
    } catch (err) {
      res.status(500).end('Internal Server Error');
    }
  });
};
