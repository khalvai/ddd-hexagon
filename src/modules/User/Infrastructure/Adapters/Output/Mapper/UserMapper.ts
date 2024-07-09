import { Injectable } from "@nestjs/common";
import Email from "src/modules/User/Domain/Email";
import Name from "src/modules/User/Domain/Name";
import Password from "src/modules/User/Domain/Password";
import User from "src/modules/User/Domain/User";
import UserId from "src/modules/User/Domain/UserId";
import UserStatus from "src/modules/User/Domain/UserStatus";
import UserPersistenceModel from "src/modules/User/Infrastructure/Adapters/Output/Model/UserPersistenceModel";


@Injectable()
export default class UserMapper
{


    toDomain(model: UserPersistenceModel): User
    {

        const user: User = new User();

        // user.userId = UserId.createFromInput("").value;
        // user.email = Email.createFromValid(model.email).value;
        // user.name = Name.createFromValid(model.name).value;
        // user.password = Password.createFromHashed(model.password).value;
        // user.status = model.status;
        // user.createdAt = model.createdAt;
        // user.updatedAt = model.updatedAt;
        // user.concurrencySafeVersion = model.concurrencySafeVersion;

        return user;
    };

    toPersistence(user: User): UserPersistenceModel
    {


        const model: UserPersistenceModel = {
            id: user.userId.value,
            email: user.email.value,
            name: user.name.value,
            password: user.password.value,
            status: user.status,
            concurrencySafeVersion: user.concurrencySafeVersion,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
        return model;
    };


}