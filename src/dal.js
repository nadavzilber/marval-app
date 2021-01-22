const {mongo} = require('./config');
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb+srv://${mongo.dbUsername}:${mongo.dbPassword}@cluster0.rjybf.mongodb.net/${mongo.dbName}?retryWrites=true&w=majority`;
let client;

const connectToMongo = () => {
    //console.log("connecting to DB url:", url)
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, dbClient) => {
            if (err) {
                //console.log('Error occurred while connecting to MongoDB Atlas...');
                client = null;
                reject(err)
            }
            client = dbClient;
            //console.log('Connected to MongoDB successfully');
            resolve();
        });
    });
}

const disconnectFromMongo = () => {
    client.close();
}

const findOne = async (collectionName, filter) => {
    //console.log('findOne collection:', collectionName, 'filter:', filter);
    const db = client.db(mongo.dbName);
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
    //console.log('insertOne collection:', collectionName, 'filter:', data);
    const db = client.db(mongo.dbName);
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
    const db = client.db(mongo.dbName);
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
    connectToMongo, disconnectFromMongo, findOne, insertOne, updateOne
}