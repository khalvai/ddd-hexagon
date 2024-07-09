import { OutboxRepository } from 'src/modules/User/Application/Ports/Output/OutboxRepository';
import { Publisher } from 'src/modules/Common/Application/Output/Publisher';
import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import PostgresqlOutboxRepository from 'src/modules/User/Infrastructure/Output/Persistence/PostgresqlOutboxRepository';
import { PrismaPostgresqlOutboxRepo } from 'src/modules/User/Infrastructure/Output/Persistence/PostgresqlOutboxRepo';



@Injectable()
export class OutboxDispatcher {
    constructor(
        private readonly outboxRepository: PrismaPostgresqlOutboxRepo,
        // private readonly outboxRepository: OutboxRepository<any>,
        // @Inject(Publisher) private readonly publisher: Publisher,
    ) { }

    @Cron('*/20 * * * * *')
    async dispatchEvents() {
        console.log(`cron is running: ${Date.now()}`);

        const outboxes = (await this.outboxRepository.getUnDispatched());

        if ("failure" in outboxes) {
            // do other things
        } else {

            for (const outbox of outboxes.ok) {
                try {


                    // await this.publisher.publish(outbox.name, "", outbox.payload);

                    await this.outboxRepository.dispatched(outbox.id);


                } catch (error) {
                    console.error('Failed to dispatch event', outbox, error);
                }
            }
        }
    }
}

// at least one time delivery 