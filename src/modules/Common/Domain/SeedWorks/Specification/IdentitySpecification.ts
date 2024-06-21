
export default class IdentitySpecification<TEntity>
{
    public check(): boolean
    {
        return true;
    }
    public isSatisfiedBy(): boolean
    {
        return true;
    }
}
