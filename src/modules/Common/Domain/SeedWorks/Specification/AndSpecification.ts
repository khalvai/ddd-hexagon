import Specification from "src/modules/Common/Domain/SeedWorks/Specification/Specification";

export default class AndSpecification<Entity> extends Specification<Entity> {
    public constructor(private readonly _left: Specification<Entity>, private readonly _right: Specification<Entity>) {
        super();
    }
    public override isSatisfiedBy(candidate: Entity): boolean {
        return this._left.isSatisfiedBy(candidate) && this._right.isSatisfiedBy(candidate);
    }
    public check(candidate: Entity): boolean {
        return this.isSatisfiedBy(candidate);
    }
}
