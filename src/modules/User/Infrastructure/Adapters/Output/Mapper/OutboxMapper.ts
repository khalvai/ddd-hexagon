import { Injectable } from "@nestjs/common";
import DomainEvent from "src/modules/Common/Domain/SeedWorks/DomainEvent";


export interface OutboxModel {

    id: string;
    name: string;
    payload: string;
    dispatched: boolean;
    occurredOn: Date;


}

// @Injectable()
export class OutboxMapper {


    toPersistence(event: DomainEvent<any, any>): OutboxModel {
        return {
            occurredOn: event.occurredOn,
            id: event.id.value,
            payload: event.payload,
            dispatched: false,
            name: event.name
        };
    }


}