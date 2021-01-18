const axios = require('axios');
const md5 = require('md5');
const {marval} = require('./config');
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
module.exports = {
    connectToMarval
}