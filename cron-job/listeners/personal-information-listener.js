const amqp = require('amqplib/callback_api');
const constants = require('../rabbitMqEvents.js')
const envConstants = require('../envConstants')
const users = require('../users/users');
const email = require('../email/email');
const notifications = require('../app-notifications/notifications')
const types = require('../notifications-tyes/notification-types')

const personalInformationListener = async function eventListenerOnRabbitMQ() {
    const notificationMessages = await types(constants.PERSONAL_INFORMATION)

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
            channel.assertQueue(constants.PERSONAL_INFORMATION, {
                durable: false
            });
            console.log(" [7] Waiting for personal information channel", constants.PERSONAL_INFORMATION);
            channel.consume(constants.PERSONAL_INFORMATION, async function(msg) {
                //fetch data against user id from database
                const userData = await users(JSON.parse(msg.content.toString()).user_id)
                if (userData) {
                    //send email to user
                    const emailResponse = await email (userData.email, constants.PERSONAL_INFORMATION, notificationMessages.email_notification_coach)
                    if (emailResponse) {
                        //insert notifications in out DB
                        const notificationResponse = await notifications (JSON.parse(msg.content.toString()).user_id, constants.PERSONAL_INFORMATION, notificationMessages.in_app_notification_coach)
                        if (notificationResponse) {
                            //TODO push notificaiton
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

module.exports = personalInformationListener;