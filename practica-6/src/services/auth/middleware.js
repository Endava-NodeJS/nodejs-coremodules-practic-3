const jwt = require('jsonwebtoken');
const {secret} = require('../../config/auth.config');
const db = require('../../models');

const Users = db.users;

exports.auth = (req, res, next) => {
    const {authorization} = req.headers;

    if (authorization) {
        const [, token] = authorization.split(' ');

        if (!token) {
            next();
            return;
        }

        return jwt.verify(token, secret, async (err, {username}) => {
            if (err || !username) {
                next();
                return;
            }

            try {
                const user = await Users.findOne({where: {username}});

                if (!user) {
                    next();
                    return;
                }

                delete user.password;
                req.user = user;

                next();

            } catch (e) {
                console.error(e.message);
            }
        });
    }
    next();
}

exports.checkAuthorization = (req, res, next) => {
    if (req.user) {
        next();
        return;
    }

    res.status(401).end('Unauthorized');
}