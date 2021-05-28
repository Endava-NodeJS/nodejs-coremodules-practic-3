const express = require('express');
const db = require('./models');
const bodyParser = require('body-parser');
const authController = require('./controllers/auth');
const cors = require('cors');
const {auth} = require('./services/auth/middleware');
const notesController = require('./controllers/notes');
const userController = require('./controllers/user');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors({origin: `http://localhost:${PORT}`}));
app.use(auth);
app.use(bodyParser.json());
app.use("/public/user-avatar",express.static('public/user-avatar'));

app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({ force: false }).then(async () => {
  console.log("DB initiated");
});

authController(app);
notesController(app);
userController(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
