import axios from 'axios';
const url = 'http://localhost:8080'

const test = async () => {
    const response = await axios.get(`${url}/ruok`);
    console.log('ruok response:', response);
}

const login = async (mode, body) => {
    console.log('api::: mode:', mode, 'body:', body)
    const response = await axios.post(`${url}/auth/${mode}`, body);
    return response.data;
}

const getUserInfo = async (body) => {
    console.log('api::: getUserInfo body:', body);
    const response = await axios.post(`${url}/user/info`, body)
    return response && response.status ? response.data : null;
}

const getComics = async (filter) => {
    console.log('getCOmics filter:', filter)
    const response = await axios.get(`${url}/marval/comics/`); //todo: add filter as query params 
    return response.data;
}

export { test, login, getUserInfo, getComics };