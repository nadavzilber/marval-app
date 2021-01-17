const { findOne, insertOne } = require('./dal');

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
                        password: response.password
                    }
                })
            else return res.send({ status: false, message: 'Login failed' });
        } else return res.send({ status: false, message: 'Invalid params' });
    } catch (err) {
        console.log('handleLogin error caught!!!', err, 'json err:', JSON.stringify(err.message))
        res.send({
            status: false,
            text: `Server error: ${err.message}`
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
            text: `Server error: ${err.message}`
        });
    }
}

module.exports = {
    handleRegister, handleLogin
}