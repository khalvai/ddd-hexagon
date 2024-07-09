import ConcurrencySafeEntity from 'src/modules/Common/Domain/SeedWorks/ConcurrencySafeEntity';
import UUID4 from 'src/modules/Common/Domain/SeedWorks/UUID4';

export default abstract class AggregateRoot<
    Id extends UUID4,
> extends ConcurrencySafeEntity<Id> {
    public abstract validatePreconditions(...args: string[]): void;
    public abstract validateInvariant(): void;
}
