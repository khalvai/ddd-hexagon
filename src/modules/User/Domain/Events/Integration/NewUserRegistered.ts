import DomainEvent from "src/modules/Common/Domain/SeedWorks/DomainEvent";

interface IDomainEvent
{
    userId: string;
    email: string;
    name: string;
}
export default class NewUserRegistered extends DomainEvent<IDomainEvent, "Integration">
{
    public constructor (userId: string, email: string, name: string)
    {
        super({ email, name, userId });
    }
    public get email(): string
    {
        return this._payload.email;
    }
    public set email(value: string)
    {
        this._payload.email = value;
    }
    public get userId(): string
    {
        return this._payload.userId;
    }
    public set userId(value: string)
    {
        this._payload.userId = value;
    }
    public get name(): string
    {
        return this._payload.name;
    }
    public set name(value: string)
    {
        this._payload.name = value;
    }
}
