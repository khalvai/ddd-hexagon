import IdentitySpecification from "src/modules/Common/Domain/SeedWorks/Specification/IdentitySpecification";

export default abstract class Specification<TEntity>
{
    public abstract isSatisfiedBy(candidate: TEntity): boolean;
    public abstract check(candidate: TEntity): boolean;

    public and(specification: Specification<TEntity>): Specification<TEntity>
    {

        if (this instanceof IdentitySpecification)
        {
            return specification;
        }
        if (specification instanceof IdentitySpecification)
        {
            return this;
        }
        const AndSpecification = require("src/Modules/Common/Main/Ts/Domain/SeedWorks/Specification/AndSpecification");

        return new AndSpecification(this, specification);
    }
    public or(specification: Specification<TEntity>): Specification<TEntity>
    {
        const OrSpecification = require("src/Modules/Common/Main/Ts/Domain/SeedWorks/Specification/OrSpecification");

        if ((this instanceof IdentitySpecification) || (specification instanceof IdentitySpecification))
        {
            return [ this, specification ].find((spec) => (spec instanceof IdentitySpecification));
        }


        return new OrSpecification(this, specification);
    }
    public not(): Specification<TEntity>
    {
        const NotSpecification = require("src/Modules/Common/Main/Ts/Domain/SeedWorks/Specification/NotSpecification");

        return new NotSpecification(this);
    }
}
