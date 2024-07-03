/* eslint-disable accessor-pairs */

import UUIDV4 from "src/modules/Common/Domain/SeedWorks/UUIDV4";


export default class DomainEvent<Payload, DomainEventReactionType = "ChangeTracking">
{
    private _occurredOn: Date = new Date();
    private _id: UUIDV4 = UUIDV4.create().value;
    private _name: string = this.constructor.name;
    private _processed: boolean = false;
    private _reactionType?: DomainEventReactionType;

    public constructor (protected _payload: Payload)
    { }
    public get occurredOn(): Date
    {
        return this._occurredOn;
    }

    public get id(): string
    {
        return this._id.value;
    }
    public get name(): string
    {
        return this._name;
    }
    public set processed(processed: boolean)
    {
        this._processed = processed;
    }
    public get processed(): boolean
    {
        return this._processed;
    }
    public get payloadToJson(): string
    {
        return JSON.stringify(this._payload);
    }

    public get payload(): Payload
    {
        return this._payload;
    }


    public get reactionType(): DomainEventReactionType
    {
        return this._reactionType;
    }
    public set reactionType(reactionType: DomainEventReactionType)
    {
        this._reactionType = reactionType;
    }
}