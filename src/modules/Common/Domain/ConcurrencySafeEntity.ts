import Entity from "src/modules/Common/Domain/Entity";
import UUID4 from "src/modules/Common/Domain/UUID4";

export default abstract class ConcurrencySafeEntity<Id extends UUID4> extends Entity<Id> {
    public concurrencySafeVersion: number = 1;
}
