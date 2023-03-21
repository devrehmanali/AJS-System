const amqp = require('amqplib/callback_api');
const constants = require('../rabbitMqEvents.js')
const envConstants = require('../envConstants')
const users = require('../users/users');
const email = require('../email/email');
const types = require('../notifications-tyes/notification-types')

const resetPasswordOTPListener = async function resetPasswordOTPListenerOnRabbitMQ() {
    const notificationMessages = await types(constants.RESET_PASSWORD_OTP)

    amqp.connect(envConstants.CLOUDAMQP_URL, function(error, connection) {
        if (error) {
            console.log(error)
            throw error;
        }
        connection.createChannel(function(error, channel) {
            if (error) {
                throw error;
            }
            channel.assertQueue(constants.RESET_PASSWORD_OTP, {
                durable: false
            });
            console.log(" [2] Waiting for reset password otp channel", constants.RESET_PASSWORD_OTP);
            channel.consume(constants.RESET_PASSWORD_OTP, async function(msg, err) {
                //fetch data against user id from database
                const userData = await users(JSON.parse(msg.content.toString()).user_id)
                if (userData) {
                    //send email to user
                    const emailResponse = await email (userData.email, constants.RESET_PASSWORD_OTP, notificationMessages.email_notification_coach)
                    if (emailResponse) {
                        //send email to admin for user signup
                        const adminEmailResponse = await email (envConstants.ADMIN_EMAIL, constants.RESET_PASSWORD_OTP, userData.first_name + ' ' + userData.last_name + ' ' + notificationMessages.email_notification_admin)
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

module.exports = resetPasswordOTPListener;