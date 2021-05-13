const db = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { secret } = require("../../config/auth.config");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });



  app.post("/notes", [],async (req, res) => {
    const { username, password } = req.body;
    const Users = db.users;
    let user;

    if (!(password || username)) {
      res.status(400);
      res.end("Bad request. Password and username fields are required.");
      return;
    }

    try {
      user = await Users.findOne({ where: { username } });

      if (!user) {
        res.status(404);
        res.end(`User not found`);
        return;
      }
    } catch (e) {
      console.error(e.message);
    }

    try {
      const isPasswordsMatch = bcrypt.compareSync(password, user.password);

      if(isPasswordsMatch) {
        const token = jwt.sign({username}, secret, {expiresIn: 86400});
        res.status(200).json({ accesToken: token });
      } else {
        res.status(401).end('Unauthorized!');
      }
    } catch (e) {
      console.error(e);
      res.status(500);
      res.end("Internal server error.");
    }
  });
};
