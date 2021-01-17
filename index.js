const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json({ limit: '10mb', type: 'application/json' }));
app.use(express.urlencoded({ extended: false }));
const port = 8080;
const { connect } = require('./src/dal')
const { handleLogin, handleRegister } = require('./src/handler');

//routes:
app.get('/ruok', (req, res) => res.json({ status: true, message: "I'm OK!" }));

app.post('/login', (req, res) => handleLogin(req.body, res));

app.post('/register', (req, res) => handleRegister(req.body, res));

//app.use('/user', (req, res) => handleRegister(req.body, res));

app.listen(port, () => init());

const init = () => {
    console.log('Server is up and running on port', port);
    connect();
}
