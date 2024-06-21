import AggregateRoot from "src/modules/Common/Domain/SeedWorks/AggregateRoot";
import UserId from "src/modules/User/Domain/UserId";

export default class User extends AggregateRoot<UserId>
{
    public validatePreconditions(...args: string[]): void
    {
        throw new Error("Method not implemented.");
    }
    public validateInvariant(): void
    {
        throw new Error("Method not implemented.");
    }

}