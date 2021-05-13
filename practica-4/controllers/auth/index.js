const db = require("../../models");
const bcrypt = require("bcrypt");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const Users = db.users;

    if (!(password || username)) {
      res.status(400);
      res.end("Bad request. Password and username fields are required.");
      return;
    }

    try {
      const user = await Users.findOne({ where: { username } });

      if (user) {
        res.status(409);
        res.end(`User with username ${username} already exists`);
        return;
      }
    } catch (e) {
      console.error(e.message);
    }

    try {
      const hashedPassword = bcrypt.hashSync(password, 8);

      await Users.create({ username, password: hashedPassword });

      res.status(201).json({ message: "Users successfully created" });
    } catch (e) {
      console.error(e);
      res.status(500);
      res.end("Internal server error.");
    }
  });
};
