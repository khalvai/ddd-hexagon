import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Publisher } from 'src/modules/Common/Application/Output/Publisher';
import { RabbitMQPublisher } from 'src/modules/Common/Infrastructure/Adapters/Output/RabbitMQPublisher';


@Global()
@Module({
    imports: [
        RabbitMQModule.forRootAsync(RabbitMQModule, {
            useFactory: (configService: ConfigService) => ({
                uri: configService.getOrThrow('RABBITMQ_URL'),
            }),
            inject: [ ConfigService ],
        }),
    ],
    controllers: [],
    providers: [

        {
            provide: Publisher,
            useClass: RabbitMQPublisher
        }, ConfigService
    ],
    exports: [],
})
export class RabbitMqModule
{
}

