const db = require('./db')

const getWatchlists = async (accountUuid) => {
    return await new Promise((resolve) => {
        db.pool.connect((err, client, done) => {
            db.logErrors(err, client, done);
            client.query({
                text: "SELECT * FROM watchlists WHERE account = $1",
                values: [accountUuid],
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

const createWatchlist = async (accountUuid, name) => {
    return await new Promise((resolve) => {
        db.pool.connect(function (err, client, done) {
            db.logErrors(err, client, done);
            client.query({
                text: "INSERT INTO watchlists (name, account) VALUES ($1, $2)",
                values: [name, accountUuid],
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

const updateWatchlist = async (accountUuid, watchlistUuid, name) => {
    return await new Promise((resolve) => {
        db.pool.connect(function (err, client, done) {
            db.logErrors(err, client, done);
            client.query({
                text: "UPDATE watchlists SET name=$1 WHERE account=$2 AND uuid=$3",
                values: [name, accountUuid, watchlistUuid],
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

const deleteWatchlist = async (accountUuid, watchlistUuid) => {
    return await new Promise((resolve) => {
        db.pool.connect(function (err, client, done) {
            db.logErrors(err, client, done);
            client.query({
                text: "DELETE FROM watchlists WHERE account=$1 AND uuid=$2",
                values: [accountUuid, watchlistUuid],
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
    getWatchlists,
    createWatchlist,
    updateWatchlist,
    deleteWatchlist
}