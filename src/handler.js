const { findOne, insertOne, updateOne } = require('./dal');

const handleLogin = async (data, res) => {
    try {
        console.log('handleLogin', data)
        if (data && data.email && data.password) {
            const collectionName = 'users';
            const filter = { email: data.email, password: data.password };
            const response = await findOne(collectionName, filter);
            console.log('findOne response:', response)
            if (!!response)
                return res.send({
                    status: true,
                    user: {
                        id: response._id,
                        username: response.username,
                        email: response.email,
                        password: response.password,
                        soryByKey: response.soryByKey
                    }
                })
            else return res.send({ status: false, message: 'Login failed' });
        } else return res.send({ status: false, message: 'Invalid params' });
    } catch (err) {
        console.log('handleLogin error caught!!!', err, 'json err:', JSON.stringify(err.message))
        res.send({
            status: false,
            message: `Server error: ${err.message}`
        });
    }
}


const handleRegister = async (data, res) => {
    try {
        console.log('handleRegister', data)
        if (data.email && data.password) {
            const collectionName = 'users';
            const userData = { email: data.email, password: data.password };
            let response = await findOne(collectionName, { email: data.email });
            console.log('findOne response:', response)
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
        console.log('handleLogin error caught!!!', err, 'json err:', JSON.stringify(err.message))
        res.send({
            status: false,
            message: `Server error: ${err.message}`
        });
    }
}

const getUserInfo = async (email, res) => {
    try {
        console.log('getUserInfo', email);
        if (email) {
            const collectionName = 'users';
            let response = await findOne(collectionName, { email });
            console.log('findOne response:', response)
            if (!!response)
                return res.send({ status: true, message: 'User information received', user: response });
            else
                res.send({ status: false, message: 'User information was not retrieved' });
        }
    } catch (err) {
        console.log('getUserInfo error caught!!!', err, 'json err:', JSON.stringify(err.message))
        res.send({
            status: false,
            message: `Server error: ${err.message}`
        });
    }
}

const setUserInfo = async (data, res) => {
    try {
        console.log('setUserInfo', data)
        if (data.query.email) {
            const collectionName = 'users';
            let response = await updateOne(collectionName, { query: { email: data.query.email }, newData: { ...data.newData } });
            //console.log('updateOne response:', response)
            console.log('success?', !!response && response.modifiedCount > 0)
            if (!!response && response.modifiedCount > 0)
                return res.send({ status: true, message: 'User information was updated' });
            else
                return res.send({ status: false, message: 'User information was not updated' });
        } else {
            console.log('else')
        }
    } catch (err) {
        console.log('setUserInfo error caught!!!', err, 'json err:', JSON.stringify(err.message))
        return res.send({
            status: false,
            message: `Server error: ${err.message}`
        });
    }
}

module.exports = {
    handleRegister, handleLogin, getUserInfo, setUserInfo
}