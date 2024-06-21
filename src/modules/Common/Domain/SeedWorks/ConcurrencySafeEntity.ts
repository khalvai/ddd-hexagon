import Entity from "src/modules/Common/Domain/SeedWorks/Entity";
import UUIDV4 from "src/modules/Common/Domain/SeedWorks/UUIDV4";

export default abstract class ConcurrencySafeEntity<TId extends UUIDV4> extends Entity<TId>
{
    private _concurrencyVersion: number = 1;

    public get concurrencyVersion(): number
    {
        return this._concurrencyVersion;
    }
    protected set concurrencyVersion(aNewValue: number)
    {
        // if (this.concurrencyVersion !== null)
        // {
        //     this.failWhenConcurrencyViolation(aNewValue);
        // }
        this._concurrencyVersion = aNewValue;
    }
    // public failWhenConcurrencyViolation(aVersion: UUID): void
    // {
    //     if (!aVersion.equals(this.concurrencyVersion))
    //     {
    //         throw new UnprocessableEntityException("Concurrency Violation: Stale data detected. Entity was already modified.");
    //     }
    // }
}
