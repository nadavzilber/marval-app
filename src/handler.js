const { findOne, insertOne, runQuery } = require('./dal');
const { results } = require('./results');

const handleLogin = async (data, res) => {
    try {
        console.log('handleLogin', data)
        if (data.email && data.password) {
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
            else return res.send({ status: false });
        }
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
            let response = await findOne(collectionName, data.email);
            console.log('findOne response:', response)
            if (!!response)
                return res.send({ status: false });
            else {
                response = await insertOne(collectionName, userData);
                console.log('inserOne resp:', response);
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
                else res.send({ status: false });
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