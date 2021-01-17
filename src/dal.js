const config = require('./config');
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb+srv://${config.dbUsername}:${config.dbPassword}@cluster0.rjybf.mongodb.net/${config.dbName}?retryWrites=true&w=majority`;
let client;

const connect = () => {
    console.log("connect to DB url:", url)
    console.log('config:', config)
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, dbClient) => {
            if (err) {
                console.log('Error occurred while connecting to MongoDB Atlas...');
                client = null;
                reject(err)
            }
            client = dbClient;
            console.log('Connected to MongoDB successfully');
            resolve();
        });
    });
}

module.exports = {
    connect: connect
}