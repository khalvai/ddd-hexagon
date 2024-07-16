import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from "@nestjs/common";
import { Publisher } from "src/modules/Common/Application/Output/Publisher";


@Injectable()
export class RabbitMQPublisher implements Publisher {

    constructor(private readonly amqpConnection: AmqpConnection) { }
    async publish(eventName: string, event: any): Promise<void> {

        console.log("here in publisher", eventName);

        let exchange = ''
        let routingKey = ""
        if (eventName === "NewUserRegistered") {
            exchange = "User"
            routingKey = "NewUserRegistered"

            console.log("in if bloack");

        }
        try {

            await this.amqpConnection.publish("User", "NewUserRegistered", event)
            console.log("published event");

        } catch (e) {
            console.log(e);

        }
    }


}