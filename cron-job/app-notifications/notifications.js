const envConstants = require('../envConstants')
const MongoClient = require('mongodb').MongoClient;
const url = envConstants.MONGO_URI;

const notifications = async (user_id, type, message) => {
    const connection = await MongoClient.connect(url);
    return await connection.db(envConstants.DATABASE_NAME).collection("notifications").insertOne({user_id, type, message, is_seen: false, is_read: false})
}

module.exports = notifications
