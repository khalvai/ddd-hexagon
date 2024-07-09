import { AmqpConnection, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Global, Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Publisher } from 'src/modules/Common/Application/Output/Publisher';
import { RabbitMQPublisher } from 'src/modules/Common/Infrastructure/Adapters/Output/RabbitMQPublisher';



@Module({
    imports: [

        RabbitMQModule.forRootAsync(RabbitMQModule, {
            useFactory: () => (


                {

                    exchanges: [{
                        name: "User",
                        type: "topic"

                    }],
                    uri: process.env.RABBITMQ_URL || "",
                    connectionInitOptions: { wait: false }
                }),

        }),
    ],
    providers: [
        {
            provide: Publisher,
            useClass: RabbitMQPublisher
        },
    ],
    exports: [
        {
            provide: Publisher,
            useClass: RabbitMQPublisher
        },
    ]
})

export class RabbitMQModuleImpl { }