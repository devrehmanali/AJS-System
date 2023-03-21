import { Injectable } from '@nestjs/common';
import {RabbitMqRepository} from '@/modules/rabbit-mq/rabbit-mq.repository';
const amqp = require('amqplib/callback_api');

@Injectable()
export class RabbitMqService {
    constructor(private readonly rabbitMqRepository: RabbitMqRepository) {}

    async create(data: any): Promise<object | undefined> {
        return this.rabbitMqRepository.create(data);
    }

    async findOneAndUpdate(filter: any, data: any): Promise<object | null> {
        return  this.rabbitMqRepository.findOneAndUpdate(filter, data, {
            new: true,
            upsert: true // Make this update into an upsert
        });
    }

    async eventEmitterOnRabbitMQ(queue: any, user_id: any) {
        amqp.connect(process.env.CLOUDAMQP_URL, function(error: any, connection: any) {
            if (error) {
                console.log(error)
                throw error;
            }
            connection.createChannel(function(error: any, channel: any) {
                console.log(channel)
                if (error) {
                    throw error;
                }
                channel.assertQueue(queue, {
                    durable: false

                });
                channel.sendToQueue(queue, new Buffer(JSON.stringify(user_id)), {
                    noAck: true
                });
            });
        });
    }

    async eventListenerOnRabbitMQ(queue: any) {

        //get user_id of the logged in user


        amqp.connect(process.env.CLOUDAMQP_URL, function(error: any, connection: any) {
            if (error) {
                throw error;
            }
            connection.createChannel(function(error: any, channel: any) {
                if (error) {
                    throw error;
                }

                channel.assertQueue(queue, {
                    durable: false
                });

                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
                channel.consume(queue, function(msg: any) {
                    if (msg === '5efdcc0e-4ca6-4729-918d-e0516db18927') {
                        console.log(" [x] Received %s", msg.content.toString());
                    } else {
                        noAck: true
                    }

                }, {
                    noAck: true
                });
            });
        });
    }


}
