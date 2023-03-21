const envConstants = require('../envConstants')
const MongoClient = require('mongodb').MongoClient;
const url = envConstants.MONGO_URI;

const users = async (user_id) => {
    const connection = await MongoClient.connect(url);
    return await connection.db(envConstants.DATABASE_NAME).collection("users").findOne({user_id})

}

module.exports = users
