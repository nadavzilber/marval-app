const express = require('express');
const userRouter = express.Router();
const { getUserInfo, setUserInfo } = require('../handler');

userRouter.get('/test', (req, res) => res.status(200).json({ status: true, message: "USER TEST OK!" }));

userRouter.get('/info', (req, res) => getUserInfo(req.query.email, res));

userRouter.post('/update', (req, res) => setUserInfo(req.body, res));

module.exports = userRouter;
