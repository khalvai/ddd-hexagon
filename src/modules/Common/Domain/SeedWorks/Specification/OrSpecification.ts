import Specification from "src/modules/Common/Domain/SeedWorks/Specification/Specification";

export default class OrSpecification<TEntity> extends Specification<TEntity>
{
    public constructor (private readonly _left: Specification<TEntity>, private readonly _right: Specification<TEntity>)
    {
        super();
    }
    public override isSatisfiedBy(candidate: TEntity): boolean
    {
        return this._left.isSatisfiedBy(candidate) || this._right.isSatisfiedBy(candidate);
    }
    public check(candidate: TEntity): boolean
    {
        return this.isSatisfiedBy(candidate);
    }
}
