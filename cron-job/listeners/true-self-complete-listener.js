const amqp = require('amqplib/callback_api');
const constants = require('../rabbitMqEvents.js')
const envConstants = require('../envConstants')
const users = require('../users/users');
const email = require('../email/email');
const notifications = require('../app-notifications/notifications')
const types = require('../notifications-tyes/notification-types')

const trueSelfCompleteListener = async function eventListenerOnRabbitMQ() {
    const notificationMessages = await types(constants.TRUE_SELF_COMPLETE)

    amqp.connect(envConstants.CLOUDAMQP_URL, function (error, connection) {
        if (error) {
            console.log(error)
            throw error;
        }
        connection.createChannel(function (error, channel) {
            if (error) {
                console.log(error)
                throw error;
            }
            channel.assertQueue(constants.TRUE_SELF_COMPLETE, {
                durable: false
            });
            console.log(" [6] Waiting for true-self-complete channel", constants.TRUE_SELF_COMPLETE);
            channel.consume(constants.TRUE_SELF_COMPLETE, async function (msg) {
                //fetch data against user id from database
                const userData = await users(JSON.parse(msg.content.toString()).user_id)
                if (userData) {
                    //send email to user
                    const emailResponse = await email(userData.email, constants.TRUE_SELF_COMPLETE, notificationMessages.email_notification_coach)
                    if (emailResponse) {
                        //insert notifications in out DB
                        const notificationResponse = await notifications(JSON.parse(msg.content.toString()).user_id, constants.TRUE_SELF_COMPLETE, notificationMessages.in_app_notification_coach)
                        if (notificationResponse) {
                            console.log('packet resolved')
                            channel.ack(msg, false);
                        }
                    }
                } else {
                    return {noAck: false}
                }
            }, {
                noAck: false
            });
        });
    });
}

module.exports = trueSelfCompleteListener;