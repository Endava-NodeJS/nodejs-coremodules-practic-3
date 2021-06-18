const {signUp, signIn} = require('../../services/auth');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/signup", signUp);

    app.post("/signin", signIn);
};
