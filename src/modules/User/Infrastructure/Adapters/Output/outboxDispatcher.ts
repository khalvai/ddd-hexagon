import { OutboxRepository } from 'src/modules/User/Application/Ports/Output/OutboxRepository';
import { Publisher } from 'src/modules/Common/Application/Output/Publisher';
import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';



@Injectable()
export class OutboxDispatcher
{
    constructor (
        private readonly outboxRepository: OutboxRepository<any>,
        @Inject(Publisher) private readonly publisher: Publisher,
    ) { }

    @Cron('*/20 * * * * *')
    async dispatchEvents()
    {
        console.log(`cron is running: ${ Date.now() }`);

        const outboxes = (await this.outboxRepository.getUnDispatched()).value;

        for (const outbox of outboxes)
        {
            try
            {

                await this.publisher.publish('', 'User: Registered', outbox.payload);

                await this.outboxRepository.dispatched(outbox.id);


            } catch (error)
            {
                console.error('Failed to dispatch event', outbox, error);
            }
        }
    }
}

// at least one time delivery 