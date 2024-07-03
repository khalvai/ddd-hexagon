import DomainEvent from "src/modules/Common/Domain/SeedWorks/DomainEvent";
import IP from "src/modules/User/Domain/IP";

interface EventPayload
{
    userId: string;
    email: string;
    name: string;
    ip: string;
}
export default class NewUserRegistered extends DomainEvent<EventPayload, "Integration">
{
    public constructor (userId: string, email: string, name: string, ip: string)
    {
        super({ email, name, userId, ip });
    }

    public get eventPayload(): EventPayload
    {
        return this._payload;
    }

}
