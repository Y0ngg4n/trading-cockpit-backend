const express = require('express');
const router = express.Router();

const watchlist = require("../models/watchlist");
const auth = require("../middleware/auth");

router.get('/watchlist/list', auth, async (req, res) => {
    try {
        if (req.user instanceof Error) {
            throw req.user;
        } else {
            await watchlist.getWatchlists(req.user.uuid).then(value => {
                return res.status(200).send(value);
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
});

router.post('/watchlist/create', auth, async (req, res) => {
    try {
        const {name} = req.body;
        if (req.user instanceof Error) {
            throw req.user;
        } else {
            await watchlist.createWatchlist(req.user.uuid, name).then(value => {
                return res.status(200).send();
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
});

router.post('/watchlist/update', auth, async (req, res) => {
    try {
        const {name, watchlistUuid} = req.body;
        if (req.user instanceof Error) {
            throw req.user;
        } else {
            await watchlist.updateWatchlist(req.user.uuid, watchlistUuid, name).then(value => {
                return res.status(200).send();
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
});

router.post('/watchlist/delete', auth, async (req, res) => {
    try {
        const {watchlistUuid} = req.body;
        if (req.user instanceof Error) {
            throw req.user;
        } else {
            await watchlist.deleteWatchlist(req.user.uuid, watchlistUuid).then(value => {
                return res.status(200).send();
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
});

module.exports = router;