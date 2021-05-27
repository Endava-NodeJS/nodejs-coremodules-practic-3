const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../models');
const {secret} = require('../../config/auth.config');

const Users = db.users;

exports.signUp = async (req, res) => {
    const {username, password} = req.body;

    if (!(password || username)) {
        res.status(400);
        res.end("Bad request. Password and username fields are required.");
        return;
    }

    try {
        const user = await Users.findOne({where: {username}});

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

        await Users.create({username, password: hashedPassword});
        res.status(201).json({message: "Users successfully created"});
    } catch (e) {
        console.error(e);
        res.status(500);
        res.end("Internal server error.");
    }
};

exports.signIn = async (req, res) => {
    const {username, password} = req.body;
    let user;

    if (!(password || username)) {
        res.status(400);
        res.end("Bad request. Password and username fields are required.");

        return;
    }

    try {
        user = await Users.findOne({where: {username}});

        if (!user) {
            res.status(404);
            res.end(`User not found`);
            return;
        }
    } catch (e) {
        console.error(e.message);
    }

    if (!user) {
        res.status(404);
        res.end(`User not found`);
        return;
    }

    try {
        const isPasswordsMatch = bcrypt.compareSync(password, user.password);

        if (isPasswordsMatch) {
            const token = jwt.sign({username}, secret, {expiresIn: 86400});

            res.status(200).json({accesToken: token});
        } else {
            res.status(401).end('Unauthorized!');
        }
    } catch (e) {
        console.error(e);
        res.status(500);
        res.end("Internal server error.");
    }
};