const watchlistQueries = require('../db/watchlist')

const getWatchlists = async (accountUuid) => {
    return new Promise(((resolve) => {
        try {
            watchlistQueries.getWatchlist(accountUuid).then(value => {
                resolve(value)
            });
        } catch (error) {
            return resolve(error);
        }
    }));
};

const createWatchlist = async (accountUuid, name) => {
    return new Promise(((resolve) => {
        try {
            watchlistQueries.createWatchlist(accountUuid, name).then(value => {
                if (value instanceof Error) {
                    resolve(value);
                } else {
                    resolve();
                }
            });
        } catch (error) {
            return resolve(error);
        }
    }));
}

const updateWatchlist = async (accountUuid, watchlistUuid, name) => {
    return new Promise(((resolve) => {
        try {
            watchlistQueries.updateWatchlist(accountUuid, watchlistUuid, name).then(value => {
                if (value instanceof Error) {
                    resolve(value);
                } else {
                    resolve();
                }
            });
        } catch (error) {
            return resolve(error);
        }
    }));
}


const deleteWatchlist = async (accountUuid, watchlistUuid) => {
    return new Promise(((resolve) => {
        try {
            watchlistQueries.deleteWatchlist(accountUuid, watchlistUuid).then(value => {
                if (value instanceof Error) {
                    resolve(value);
                } else {
                    resolve();
                }
            });
        } catch (error) {
            return resolve(error);
        }
    }));
}


module.exports = {
    getWatchlists,
    createWatchlist,
    updateWatchlist,
    deleteWatchlist
}
