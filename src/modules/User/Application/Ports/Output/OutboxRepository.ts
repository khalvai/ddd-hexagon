import Result from "src/modules/Common/Application/Result";
import { OutboxModel } from "src/modules/User/Infrastructure/Output/Mapper/OutboxMapper";
export const OutboxRepository = Symbol("OutboxRepository").valueOf();
export interface OutboxRepository {
  getUnDispatched(): Promise<OutboxModel[]>;
  save(outboxes: OutboxModel[], connection: any): Promise<void>;
  dispatched(eventId: string): Promise<void>;
}
