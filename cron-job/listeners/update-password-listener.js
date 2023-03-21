const amqp = require('amqplib/callback_api');
const constants = require('../rabbitMqEvents.js')
const envConstants = require('../envConstants')
const users = require('../users/users');
const email = require('../email/email');
const notifications = require('../app-notifications/notifications')
const types = require('../notifications-tyes/notification-types')

const updatePasswordListener = async function updatePasswordListenerOnRabbitMQ() {
    const notificationMessages = await types(constants.UPDATE_PASSWORD)

    amqp.connect(envConstants.CLOUDAMQP_URL, function(error, connection) {
        if (error) {
            console.log(error)
            throw error;
        }
        connection.createChannel(function(error, channel) {
            if (error) {
                console.log(error)
                throw error;
            }
            channel.assertQueue(constants.UPDATE_PASSWORD, {
                durable: false
            });
            console.log(" [4] Waiting for update password channel", constants.UPDATE_PASSWORD);
            channel.consume(constants.UPDATE_PASSWORD, async function(msg) {
                //fetch data against user id from database
                const userData = await users(JSON.parse(msg.content.toString()).user_id)
                if (userData) {
                    //send email to user
                    const emailResponse = await email (userData.email, constants.UPDATE_PASSWORD, notificationMessages.email_notification_coach)
                    if (emailResponse) {
                        //send email to admin for user signup
                        const adminEmailResponse = await email (envConstants.ADMIN_EMAIL, constants.UPDATE_PASSWORD, userData.first_name + ' ' + userData.last_name + ' ' + notificationMessages.email_notification_admin)
                        if (adminEmailResponse) {
                            console.log('packet resolved')
                            channel.ack(msg, false);
                        }
                    }
                } else {
                    return  {noAck: false}
                }
            }, {
                noAck: false
            });
        });
    });
}

module.exports = updatePasswordListener;