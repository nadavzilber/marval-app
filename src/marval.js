const axios = require('axios');
const md5 = require('md5');
const { marval } = require('./config');
const ts = Math.random() * (1000 - 1) + 1000;
const hash = md5(ts + marval.privateKey + marval.publicKey);
const url = `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${marval.publicKey}&hash=${hash}`;

let comicsState = [];

const connectToMarval = async () => {
    try {
        console.log('connectToMarval', url)
        const response = await axios({
            method: 'GET',
            url: url,
            headers: {
                accept: '*/*'
            }
        });
        if (response.data && response.data.data) {
            console.log('connectToMarval success!');
            comicsState = response.data.data;
        }
    } catch (err) {
        console.log('connectToMarval: error caught:', err)
    }
}

const getComics = async (body, res) => {
    try {
        console.log('getComics', url, body)
        const response = await axios({
            method: 'GET',
            url: url,
            headers: {
                accept: '*/*'
            }
        });
        if (response.data && response.data.data) {
            console.log('getComics success!');
            return res.send({ status: true, message: 'getComics success', comics: response.data.data });
        } else
            return res.send({ status: false, message: 'getComics failed' });
    } catch (err) {
        console.log('getComics: error caught:', err)
        return res.send({
            status: false,
            message: `getComics error: ${err.message}`
        });
    }
}

module.exports = {
    connectToMarval,
    getComics
}