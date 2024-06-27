import DomainEvent from "src/modules/Common/Domain/SeedWorks/DomainEvent";
import IdentifiedDomainObject from "src/modules/Common/Domain/SeedWorks/IdentifiedDomainObject";
import UUIDV4 from "src/modules/Common/Domain/SeedWorks/UUIDV4";


export default abstract class Entity<TId extends UUIDV4> extends IdentifiedDomainObject<TId>
{
    private _events: Set<DomainEvent<any>> = new Set();

    public addEvent(event: DomainEvent<any, any>): void
    {

        this._events.add(event);
    }
    public clearEvent(): void
    {
        this._events.clear();
    }
    public getEvents(): Set<DomainEvent<any>>
    {
        const a = this._events.entries();
        for (const e of a)
        {
            e[ 0 ].reactionType;

        }
        return this._events;
    }
    public equals(anEntity: Entity<TId>): boolean
    {
        if (this === anEntity)
        {
            return true;
        }
        if ((anEntity instanceof Entity) && (this.id === anEntity.id))
        {
            return true;
        }
        return false;
    }
}
