import axios from 'axios';
const url = 'http://localhost:8080'

const test = async () => {
    const response = await axios.get(`${url}/ruok`);
    console.log('ruok response:', response);
}

const login = async (mode, body) => {
    //console.log('api:::', mode, 'body:', body)
    const response = await axios.post(`${url}/auth/${mode}`, body);
    return response.data;
}

const getUserInfo = async (email) => {
    //console.log('api::: getUserInfo email:', email);
    email = encodeURIComponent(email);
    const response = await axios.get(`${url}/user/info?email=${email}`);
    return response && response.status ? response.data : null;
}

const setUserInfo = async (body) => {
    //console.log('api::: setUserInfo body:', body);
    const response = await axios.post(`${url}/user/update`, body)
    //console.log('response????', response)
    return response && response.status ? response.data : null;
}

const updateAnalytics = async (body) => {
    //console.log('updateAnalytics',body)
    const response = await axios.post(`${url}/analytics/add`, body);
    //console.log('updateAnalytics response:',response)
}

const getComics = async (filter) => {
    //console.log('api::: getComics filter:', filter)
    const response = await axios.post(`${url}/marval/comics/`, filter);
    return response.data;
}

export { test, login, getUserInfo, setUserInfo, updateAnalytics, getComics };