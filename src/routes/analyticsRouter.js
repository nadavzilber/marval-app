const express = require('express');
const analyticsRouter = express.Router();
const {handleGetAnalytics, handleAnalytics} = require('../handler');

analyticsRouter.get('/get', (req, res) => handleGetAnalytics(req.query.email, res));

analyticsRouter.post('/add', (req, res) => handleAnalytics(req.body, res));

module.exports = analyticsRouter;
