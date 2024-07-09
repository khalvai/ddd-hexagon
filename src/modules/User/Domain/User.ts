import AggregateRoot from "src/modules/Common/Domain/AggregateRoot";
import Email from "src/modules/User/Domain/Email";
import NewUserRegistered from "src/modules/User/Domain/Events/Integration/NewUserRegistered";
import IP from "src/modules/User/Domain/IP";
import Name from "src/modules/User/Domain/Name";
import Password from "src/modules/User/Domain/Password";
import UserId from "src/modules/User/Domain/UserId";
import UserStatus from "src/modules/User/Domain/UserStatus";

export default class User extends AggregateRoot<UserId> {


    public email: Email;
    public password: Password;
    public name: Name;
    public status: string = UserStatus.PENDING_EMAIL_VERIFICATION;
    public createdAt: Date;
    public updatedAt: Date;



    public get userId(): UserId {
        return this.id;
    };


    public set userId(userId: UserId) {
        this.id = userId;
    };



    public register(userId: UserId, name: Name, email: Email, password: Password, ip: IP): void {
        const now = new Date();
        now.setMilliseconds(0);


        this.updatedAt = now;
        this.id = userId;
        this.name = name;

        this.email = email;

        this.password = password;

        this.status = UserStatus.PENDING_EMAIL_VERIFICATION;
        this.createdAt = now;
        this.updatedAt = now;

        const e = new NewUserRegistered
            (
                userId.value,
                email.value,
                name.value,
                ip.value
            );

        this.addEvent
            (
                new NewUserRegistered
                    (
                        userId.value,
                        email.value,
                        name.value,
                        ip.value
                    )
            );
    }




    public validatePreconditions(...args: string[]): void {
        throw new Error("Method not implemented.");
    }
    public validateInvariant(): void {
        throw new Error("Method not implemented.");
    }

}