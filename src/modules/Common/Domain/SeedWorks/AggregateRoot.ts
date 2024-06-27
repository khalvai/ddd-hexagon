import ConcurrencySafeEntity from 'src/modules/Common/Domain/SeedWorks/ConcurrencySafeEntity';
import Entity from 'src/modules/Common/Domain/SeedWorks/Entity';
import UUIDV4 from 'src/modules/Common/Domain/SeedWorks/UUIDV4';

export default abstract class AggregateRoot<
    TId extends UUIDV4,
> extends ConcurrencySafeEntity<TId>
{
    public abstract validatePreconditions(...args: string[]): void;
    public abstract validateInvariant(): void;
}
