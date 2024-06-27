import Result from "src/modules/Common/Application/Result";
import User from "src/modules/User/Domain/User";
import UserId from "src/modules/User/Domain/UserId";

export const UserRepository = Symbol("UserRepository").valueOf();
export interface UserRepository
{
    load(userId: UserId): Promise<Result<User>>;
    save(user: User): Promise<Result<void>>;

}