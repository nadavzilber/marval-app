const config = require('./config');
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb+srv://${config.dbUsername}:${config.dbPassword}@cluster0.rjybf.mongodb.net/${config.dbName}?retryWrites=true&w=majority`;
let client;

const connect = () => {
    console.log("connecting to DB url:", url)
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

const disconnect = () => {
    client.close();
}

const findOne = async (collectionName, filter) => {
    console.log('findOne collection:', collectionName, 'filter:', filter);
    const db = client.db(config.dbName);
    return new Promise((resolve, reject) => {
        db.collection(collectionName).findOne(filter, (err, result) => {
            if (err) {
                //console.log('failed', err)
                reject(err);
            } else {
                //console.log('success', result)
                resolve(result);
            }
        })
    })
}

const insertOne = async (collectionName, data) => {
    console.log('insertOne collection:', collectionName, 'filter:', data);
    const db = client.db(config.dbName);
    return new Promise((resolve, reject) => {
        db.collection(collectionName).insertOne(data, (err, result) => {
            if (err) {
                //console.log('insertOne failed', err)
                reject(err);
            } else {
                //console.log('insertOne success')
                resolve(result);
            }
        })
    })
}

const updateOne = async (collectionName, data) => {
    const { query, newData } = data;
    const db = client.db(config.dbName);
    const newValues = { $set: { ...newData } };
    //console.log('query:', query, 'newValues:', newValues)
    return new Promise((resolve, reject) => {
        db.collection(collectionName).updateOne(query, newValues, (err, result) => {
            if (err) {
                //console.log('insertOne failed', err)
                reject(err);
            } else {
                //console.log('insertOne success')
                resolve(result);
            }
        })
    })
}

module.exports = {
    connect, disconnect, findOne, insertOne, updateOne
}