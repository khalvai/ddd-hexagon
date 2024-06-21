import Specification from "src/modules/Common/Domain/SeedWorks/Specification/Specification";

export default class NotSpecification<TEntity> extends Specification<TEntity>
{
    public constructor (private readonly _specification: Specification<TEntity>)
    {
        super();
    }
    public override isSatisfiedBy(candidate: TEntity): boolean
    {
        return !this._specification.isSatisfiedBy(candidate);
    }
    public check(candidate: TEntity): boolean
    {
        return this.isSatisfiedBy(candidate);
    }
}
