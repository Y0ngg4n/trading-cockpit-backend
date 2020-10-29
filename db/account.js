const db = require('./db')

const getAccountByToken = async (token) => {
    return await new Promise((resolve) => {
        db.pool.connect((err, client, done) => {
            db.logErrors(err, client, done);
            client.query({
                text: "SELECT * FROM accounts WHERE token=$1 AND token IS NOT NULL",
                values: [token],
                callback: function (err, results) {
                    done();
                    if (err) {
                        resolve(err);
                    } else if (results) {
                        resolve(results.rows);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    });
};

const getAccountByEmail = async (email) => {
    return await new Promise((resolve) => {
        db.pool.connect((err, client, done) => {
            db.logErrors(err, client, done);
            client.query({
                text: "SELECT * FROM accounts WHERE email=$1",
                values: [email],
                callback: function (err, results) {
                    done()
                    if (err) {
                        resolve(err);
                    } else if (results) {
                        resolve(results.rows);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    });
};

const registerNewAccount = async (email, password, token) => {
    return await new Promise((resolve) => {
        db.pool.connect(function (err, client, done) {
            db.logErrors(err, client, done);
            client.query({
                text: "SELECT * FROM accounts WHERE email=$1",
                values: [email],
                callback: function (err, results) {
                    if (results.rowCount > 0) {
                        resolve(new Error("User with this Email already exists"));
                    } else {
                        client.query({
                            text: "INSERT INTO accounts (email, password, token) VALUES ($1, $2, $3);",
                            values: [email, password, token],
                            callback: function (err, results) {
                                done();
                                if (err) {
                                    resolve(err);
                                } else if (results) {
                                    resolve(results.rows);
                                } else {
                                    resolve(false);
                                }
                            }
                        });
                    }
                }
            });
        });
    });
};

const updateTokenByEmail = async (email, token) => {
    return await new Promise((resolve) => {
        db.pool.connect(function (err, client, done) {
            db.logErrors(err, client, done);
            client.query({
                text: "UPDATE accounts SET token=$1 WHERE email=$2",
                values: [token, email],
                callback: function (err, results) {
                    done();
                    if (err) {
                        resolve(err);
                    } else if (results) {
                        resolve(results.rows);
                    } else {
                        resolve();
                    }
                }
            });

        });
    });
};

module.exports = {
    getAccountByEmail,
    getAccountByToken,
    registerNewAccount,
    updateTokenByEmail
}