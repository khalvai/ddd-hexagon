/* eslint-disable accessor-pairs */

import UUID4 from "./UUID4";



export default class DomainEvent<Payload, DomainEventReactionType = "ChangeTracking"> {
    public readonly occurredOn: Date = new Date();
    public readonly id: UUID4 = UUID4.create();
    public readonly name: string = this.constructor.name;
    public reactionType?: DomainEventReactionType;

    public constructor(public readonly payload: Payload) { }

    public get payloadToJson(): string {
        return JSON.stringify(this.payload);
    }

}