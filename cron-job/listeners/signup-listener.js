const amqp = require('amqplib/callback_api');
const constants = require('../rabbitMqEvents.js')
const envConstants = require('../envConstants')
const users = require('../users/users');
const email = require('../email/email');
const notifications = require('../app-notifications/notifications')
const types = require('../notifications-tyes/notification-types')

const signupListener = async function eventListenerOnRabbitMQ() {
    const notificationMessages = await types(constants.SIGNUP_TO_WELLAVI)

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
            channel.assertQueue(constants.SIGNUP_TO_WELLAVI, {
                durable: false
            });
            console.log(" [1] Waiting for signup channel", constants.SIGNUP_TO_WELLAVI);
            channel.consume(constants.SIGNUP_TO_WELLAVI, async function(msg) {
                //fetch data against user id from database
                const userData = await users(JSON.parse(msg.content.toString()).user_id)
                if (userData) {
                    //send email to user
                    const emailResponse = await email (userData.email, constants.SIGNUP_TO_WELLAVI, notificationMessages.email_notification_coach)
                    if (emailResponse) {
                        //send email to admin for user signup
                        const adminEmailResponse = await email (envConstants.ADMIN_EMAIL, constants.SIGNUP_TO_WELLAVI, userData.first_name + ' ' + userData.last_name + ' ' + notificationMessages.email_notification_admin)
                        if (adminEmailResponse) {
                            //insert notifications in out DB
                            const notificationResponse = await notifications (JSON.parse(msg.content.toString()).user_id, constants.SIGNUP_TO_WELLAVI, notificationMessages.in_app_notification_coach)
                            if (notificationResponse) {
                                console.log('packet resolved')
                                channel.ack(msg, false);
                            }
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

module.exports = signupListener;