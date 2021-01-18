const express = require('express');
const router = express.Router();
const { handleLogin, handleRegister } = require('../handler');
const userRouter = require('./userRouter');

router.get('/ruok', (req, res) => res.status(200).json({ status: true, message: "I'm OK!" }));

router.post('/auth/login', (req, res) => handleLogin(req.body, res));

router.post('/auth/register', (req, res) => handleRegister(req.body, res));

router.use('/user', userRouter);

module.exports = router;