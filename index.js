const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const port = 8080;
const { connect } = require('./src/dal')

//routes:
app.get('/ruok', (req, res) => res.json({ status: true, message: "I'm OK!" }));

app.listen(port, () => init());

const init = () => {
    console.log('Server is up and running on port', port);
    connect();
}
