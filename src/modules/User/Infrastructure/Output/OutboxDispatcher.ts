import { OutboxRepository } from "src/modules/User/Application/Ports/Output/OutboxRepository";
import { Publisher } from "src/modules/Common/Application/Output/Publisher";
import { Inject, Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import PostgresqlOutboxRepository from "src/modules/User/Infrastructure/Output/Persistence/PostgresqlOutboxRepository";

@Injectable()
export class OutboxDispatcher {
  constructor(
    @Inject(OutboxRepository)
    private readonly outboxRepository: OutboxRepository,
    @Inject(Publisher) private readonly publisher: Publisher,
  ) {}

  @Cron("*/20 * * * * *")
  async dispatchEvents() {
    console.log(`cron is running: ${Date.now()}`);

    try {
      const outboxes = await this.outboxRepository.getUnDispatched();

      for (const outbox of outboxes) {
        console.log(outbox);
        await this.publisher.publish("", outbox.name, outbox.payload);
        await this.outboxRepository.dispatched(outbox.id);
      }
    } catch (error) {
      console.error("Failed to dispatch event", error);
    }
  }
}

// at least one time delivery
