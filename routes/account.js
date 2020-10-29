const express = require('express');
const router = express.Router();

const accounts = require("../models/account");

router.post('/accounts/register', async (req, res) => {
    // Create a new user
    try {
        const {email, password} = req.body;
        const token = await accounts.generateAuthToken(email);
        await accounts.register(email, password, token).then(value => {
            if (value instanceof Error) {
                return res.status(401).send({error: value.message});
            } else {
                return res.status(201).send({token});
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
});


router.post('/accounts/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const token = await accounts.generateAuthToken(email);
        await accounts.login(email, password, token).then(userAccount => {
            if (userAccount instanceof Error) {
                return res.status(401).send({error: userAccount.message});
            } else {
                return res.status(200).send(getUserData(userAccount, token));
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
});

const getUserData = (userAccount, token) => {
    return {
        uuid: userAccount.uuid,
        email: userAccount.email,
        nickname: userAccount.nickname,
        token: token,
    };
};


module.exports = router;