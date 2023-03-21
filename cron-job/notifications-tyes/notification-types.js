const envConstants = require('../envConstants')
const MongoClient = require('mongodb').MongoClient;
const url = envConstants.MONGO_URI;

const notificationTypes = async (type) => {
    const connection = await MongoClient.connect(url);
    return await connection.db(envConstants.DATABASE_NAME).collection("notification-types").findOne({action: type})
}
module.exports = notificationTypes
