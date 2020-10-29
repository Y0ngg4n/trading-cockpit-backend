const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config')

const db = require('../db/db')
const accountQueries = require('../db/account')

const generateAuthToken = async (email) => {
    // Generate an auth token for the user
    return jwt.sign({email: email}, config.JWT_PUBLIC_KEY);
};

const register = async (email, password, token) => {
    return new Promise(((resolve) => {
        try {
            bcrypt.hash(password, 10, async (error, hashed) => {
                if (error) {
                    throw error;
                } else {
                    await accountQueries.registerNewAccount(email, hashed, token).then(value => {
                        if (value instanceof Error) {
                            resolve(value);
                        } else {
                            resolve();
                        }
                    });
                }
            });
        } catch (error) {
            return resolve(error);
        }
    }));
};

const login = async (email, password, token) => {
    // Search for a user by email and password.
    return await new Promise((resolve) => {
        try {
            accountQueries.getAccountByEmail(email).then(function (value) {
                const account = value[0];
                if (!account) {
                    resolve(new Error("Invalid login credentials"));
                } else {
                    console.log(password)
                    bcrypt.compare(password, account.password).then(result => {
                        if (result) {
                            accountQueries.updateTokenByEmail(email, token).then(updateResult => {
                                if (updateResult instanceof Error) {
                                    resolve(updateResult)
                                } else {
                                    resolve(account);
                                }
                            });
                        } else {
                            resolve(new Error("Invalid login credentials"));
                        }
                    }, error => {
                        resolve(new Error("Invalid login credentials"));
                    });
                }
            });
        } catch (error) {
            resolve(error);
        }
    });
};

module.exports = {
    generateAuthToken,
    register,
    login
}