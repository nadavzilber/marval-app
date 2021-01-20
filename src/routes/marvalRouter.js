const express = require('express');
const marvalRouter = express.Router();
const {getComics} = require('../marval');

marvalRouter.get('/test', (req, res) => res.status(200).json({ status: true, message: "marval test success!" }));

marvalRouter.post('/comics', (req, res) => getComics(req.body, res));

module.exports = marvalRouter;
