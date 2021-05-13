const express = require("express");
const db = require("./models");
const bodyParser = require("body-parser");
const authController = require("./controllers/auth");
const cors = require("cors");

const PORT = process.env.PORT || 8080;
const app = express();
// const Notes = db.notes;

app.use(cors({ origin: `http://localhost:${PORT}` }));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({ force: false }).then(async () => {
  console.log("DB initiated");

  // const notes = await Notes.findAll();
});

authController(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
