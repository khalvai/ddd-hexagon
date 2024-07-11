import { Inject } from "@nestjs/common";
import Result from "src/modules/Common/Application/Result";
import Email from "src/modules/User/Domain/Email";
import User from "src/modules/User/Domain/User";
import UserId from "src/modules/User/Domain/UserId";

export const UserRepository = Symbol("UserRepository").valueOf();
export interface UserRepository {
    load(userId: UserId): Promise<User>;
    loadByEmail(email: Email): Promise<User>;
    save(user: User): Promise<void>;

}
