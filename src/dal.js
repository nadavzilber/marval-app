const { mongo } = require('./config');
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

const find = async (collectionName, query) => {
    const db = client.db(mongo.dbName);
    const options = {
        sort: { _id: 1 }
    };
    let data = [];
    return new Promise((resolve, reject) => {
        db.collection(collectionName).find(query, options, async (err, results) => {
            if (err) {
                reject(err);
            } else {
                await results.forEach((r) => {
                    data.push(r)
                });
                resolve(data);
            }
        });
    });
}

const findOne = async (collectionName, filter) => {
    const db = client.db(mongo.dbName);
    return new Promise((resolve, reject) => {
        db.collection(collectionName).findOne(filter, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

const insertOne = async (collectionName, data) => {
    const db = client.db(mongo.dbName);
    return new Promise((resolve, reject) => {
        db.collection(collectionName).insertOne(data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

const updateOne = async (collectionName, data) => {
    const { query, newData } = data;
    const db = client.db(mongo.dbName);
    const newValues = { $set: { ...newData } };
    return new Promise((resolve, reject) => {
        db.collection(collectionName).updateOne(query, newValues, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

module.exports = {
    connectToMongo, disconnectFromMongo, find, findOne, insertOne, updateOne
}