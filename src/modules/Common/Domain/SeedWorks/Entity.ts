import DomainEvent from "src/modules/Common/Domain/SeedWorks/DomainEvent";
import UUID4 from "./UUID4";


export default abstract class Entity<Id extends UUID4> {

    public id: Id
    private events: Set<DomainEvent<any>> = new Set();

    protected addEvent(event: DomainEvent<any, any>): void {

        this.events.add(event);
    }
    public clearEvent(): void {
        this.events.clear();
    }
    public getEvents(): Set<DomainEvent<any>> {
        const a = this.events.entries();
        for (const e of a) {
            e[0].reactionType;

        }
        return this.events;
    }
    public equals(entity: Entity<Id>): boolean {
        if (this === entity) {
            return true;
        }
        if ((entity instanceof Entity) && (this.id === entity.id)) {
            return true;
        }
        return false;
    }
}
