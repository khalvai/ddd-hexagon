import Result from "src/modules/Common/Application/Result";
import { OutboxModel } from "src/modules/User/Infrastructure/Adapters/Output/Mapper/OutboxMapper";
export const OutboxRepository = Symbol('OutboxRepository').valueOf();
export interface OutboxRepository<Connection> {

    getUnDispatched(): Promise<Result<OutboxModel[]>>;
    save(outboxes: OutboxModel[], connection: Connection): Promise<void>;
    dispatched(eventId: string): Promise<void>;

}