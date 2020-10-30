var async = require('async');
var fs = require('fs');
var pg = require('pg');

// Connect to the "bank" database.
var config = {
    user: 'trading_cockpit',
    host: 'localhost',
    database: 'trading_cockpit',
    port: 26257
};

// Create a pool.
const pool = new pg.Pool(config);

const createTables = async () => {
    return await new Promise((resolve) => {
        pool.connect(function (err, client, done) {
            logErrors(err, client, done);
            async.waterfall([
                function (next) {
                    client.query("CREATE TABLE IF NOT EXISTS accounts (uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(), " +
                        "email STRING NOT NULL UNIQUE CHECK (email LIKE '%@%'), password STRING NOT NULL," +
                        "token STRING, apikey string);", next);
                },
            ]).then(value => {
                done();
                if (value instanceof Error) {
                    resolve(value);
                } else {
                    resolve();
                }
            });
        });
    })
};

function logErrors(err, client, done) {

    if (err) {
        console.error('Could not connect to cockroachdb', err);
        done()
    } else {
        console.log("Successfully connected to cockroachdb");
    }
}

module.exports = {
    pool,
    createTables,
    logErrors,
};