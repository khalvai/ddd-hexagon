import IdentitySpecification from "src/modules/Common/Domain/Specification/IdentitySpecification";

export default abstract class Specification<Entity> {
    public abstract isSatisfiedBy(candidate: Entity): boolean;
    public abstract check(candidate: Entity): boolean;

    public and(specification: Specification<Entity>): Specification<Entity> {

        if (this instanceof IdentitySpecification) {
            return specification;
        }
        if (specification instanceof IdentitySpecification) {
            return this;
        }
        const AndSpecification = require("src/Modules/Common/Main/Ts/Domain/SeedWorks/Specification/AndSpecification");

        return new AndSpecification(this, specification);
    }
    public or(specification: Specification<Entity>): Specification<Entity> {
        const OrSpecification = require("src/Modules/Common/Main/Ts/Domain/SeedWorks/Specification/OrSpecification");

        if ((this instanceof IdentitySpecification) || (specification instanceof IdentitySpecification)) {
            // return [ this, specification ].find((spec) => (spec instanceof IdentitySpecification));
        }


        return new OrSpecification(this, specification);
    }
    public not(): Specification<Entity> {
        const NotSpecification = require("src/Modules/Common/Main/Ts/Domain/SeedWorks/Specification/NotSpecification");

        return new NotSpecification(this);
    }
}
