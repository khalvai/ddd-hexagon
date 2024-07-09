import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from "@nestjs/common";
import { UserResponseMessages } from "ResponseMessages/user.response.messages";
import { Publisher } from "src/modules/Common/Application/Output/Publisher";
import Result from "src/modules/Common/Application/Result";


@Injectable()
export class RabbitMQPublisher implements Publisher {

    constructor(private readonly amqpConnection: AmqpConnection) { }

    async publish(exchange: string, routingKey: string, data: any): Promise<Result<void>> {
        try {


            await this.amqpConnection.publish(exchange, routingKey, data);



            return { ok: undefined }
        } catch (error) {
            console.log(error);


            return { failure: {} as any }
        }

    }
    publishToQueue(queue: string, data: any): Promise<Result<void>> {
        throw new Error("Method not implemented.");
    }
}