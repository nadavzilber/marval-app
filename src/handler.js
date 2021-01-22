const { find, findOne, insertOne, updateOne } = require('./dal');

const handleLogin = async (data, res) => {
    try {
        if (data && data.email && data.password) {
            const collectionName = 'users';
            const filter = { email: data.email, password: data.password };
            const response = await findOne(collectionName, filter);
            if (!!response)
                return res.send({
                    status: true,
                    user: { ...response }
                })
            else return res.send({ status: false, message: 'Login failed' });
        } else return res.send({ status: false, message: 'Invalid params' });
    } catch (err) {
        res.send({
            status: false,
            message: `Server error: ${err.message}`
        });
    }
}


const handleRegister = async (data, res) => {
    try {
        if (data.email && data.password) {
            const collectionName = 'users';
            const userData = { email: data.email, password: data.password };
            let response = await findOne(collectionName, { email: data.email });
            if (!!response)
                return res.send({ status: false, message: 'This email is already taken' });
            else {
                response = await insertOne(collectionName, userData);
                if (!!response && response.insertedCount > 0) {
                    return res.send({
                        status: true,
                        user: { ...response.ops[0] }
                    })
                }
                else res.send({ status: false, message: 'couldnt update' });
            }
        }
    } catch (err) {
        res.send({
            status: false,
            message: `Server error: ${err.message}`
        });
    }
}

const getUserInfo = async (email, res) => {
    try {
        if (email) {
            let response = await findOne('users', { email });
            if (!!response) {
                const user = response;
                response = await find('analytics', { email })
                if (!!response) {
                    user.analytics = response;
                    return res.send({ status: true, message: 'User information (*) received', user });
                } else res.send({ status: false, message: 'User information (*) was not retrieved' });
            } else
                res.send({ status: false, message: 'User information was not retrieved' });
        }
    } catch (err) {
        res.send({
            status: false,
            message: `Server error: ${err.message}`
        });
    }
}

const setUserInfo = async (data, res) => {
    try {
        if (data.query.email) {
            const collectionName = 'users';
            let response = await updateOne(collectionName, { query: { email: data.query.email }, newData: { ...data.newData } });
            if (!!response && response.modifiedCount > 0)
                return res.send({ status: true, message: 'User information was updated' });
            else
                return res.send({ status: false, message: 'User information was not updated' });
        }
    } catch (err) {
        return res.send({
            status: false,
            message: `Server error: ${err.message}`
        });
    }
}

const handleAnalytics = async (data, res) => {
    try {
        if (data.email && data.sortByKey) {
            const collectionName = 'analytics';
            let response = await insertOne(collectionName, { date: new Date().toLocaleString(), email: data.email, sortByKey: data.sortByKey });
            if (!!response)
                return res.send({ status: true, message: 'Analytics was updated' });
            else
                return res.send({ status: false, message: 'Analyticsn was not updated' });
        }
    } catch (err) {
        return res.send({
            status: false,
            message: ` Server error: ${err.message}`
        });
    }
}

const handleGetAnalytics = async (email, res) => {
    try {
        if (email) {
            const collectionName = 'analytics';
            let response = await find(collectionName, { email });
            if (!!response) {
                return res.send(response);
            }
            else
                res.send({ status: false, message: 'User analytics information was not retrieved' });
        }
    } catch (err) {
        console.log('catch:', err)
        res.send({
            status: false,
            message: `Server error: ${err.message}`
        });
    }
}

module.exports = {
    handleRegister, handleLogin, getUserInfo, setUserInfo, handleAnalytics, handleGetAnalytics
}