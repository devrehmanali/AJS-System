const amqp = require('amqplib/callback_api');
const constants = require('../rabbitMqEvents.js')
const envConstants = require('../envConstants')
const users = require('../users/users');
const email = require('../email/email');
const notifications = require('../app-notifications/notifications')
const types = require('../notifications-tyes/notification-types')

const publicationsListener = async function eventListenerOnRabbitMQ() {
    const notificationMessages = await types(constants.PUBLICATIONS)

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
            channel.assertQueue(constants.PUBLICATIONS, {
                durable: false
            });
            console.log(" [8] Waiting for publications channel", constants.PUBLICATIONS);
            channel.consume(constants.PUBLICATIONS, async function(msg) {
                //fetch data against user id from database
                const userData = await users(JSON.parse(msg.content.toString()).user_id)
                if (userData) {
                    //send email to user
                    const emailResponse = await email (userData.email, constants.PUBLICATIONS, notificationMessages.email_notification_coach)
                    if (emailResponse) {
                        //insert notifications in out DB
                        const notificationResponse = await notifications (JSON.parse(msg.content.toString()).user_id, constants.PUBLICATIONS, notificationMessages.in_app_notification_coach)
                        if (notificationResponse) {
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

module.exports = publicationsListener;