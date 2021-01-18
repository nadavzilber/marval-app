const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json({ limit: '10mb', type: 'application/json' }));
app.use(express.urlencoded({ extended: false }));
const port = 8080;
const { connectToMongo } = require('./src/dal')
const { connectToMarval } = require('./src/marval');
const router = require('./src/routes/routes');

app.use('/', router);

app.listen(port, () => init());

const init = () => {
    console.log('Server is up and running on port', port);
    connectToMongo();
    //connectToMarval();
}
