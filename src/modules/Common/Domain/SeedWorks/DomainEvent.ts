/* eslint-disable accessor-pairs */

import UUIDV4 from "src/modules/Common/Domain/SeedWorks/UUIDV4";


export default class DomainEvent<TDomainEvent, DomainEventReactionType = "SAVE">
{
    private _occurredOn: Date = new Date();
    private _id: UUIDV4 = UUIDV4.create().value;
    private _type: string = this.constructor.name;
    private _processed: boolean = false;
    private _reactionType?: DomainEventReactionType;

    public constructor (protected _payload: TDomainEvent) { }
    public get occurredOn(): Date
    {
        return this._occurredOn;
    }

    public get id(): string
    {
        return this._id.value;
    }
    public get type(): string
    {
        return this._type;
    }
    public set proccessed(proccessed: boolean)
    {
        this._processed = proccessed;
    }
    public get proccessed(): boolean
    {
        return this._processed;
    }
    public get payload(): string
    {
        return JSON.stringify(this._payload);
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