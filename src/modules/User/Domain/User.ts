import AggregateRoot from "src/modules/Common/Domain/SeedWorks/AggregateRoot";
import Email from "src/modules/User/Domain/Email";
import NewUserRegistered from "src/modules/User/Domain/Events/Integration/NewUserRegistered";
import IP from "src/modules/User/Domain/IP";
import Name from "src/modules/User/Domain/Name";
import Password from "src/modules/User/Domain/Password";
import UserId from "src/modules/User/Domain/UserId";
import UserStatus from "src/modules/User/Domain/UserStatus";

export default class User extends AggregateRoot<UserId>
{


    private _email: Email;
    private _password: Password;
    private _name: Name;
    private _status: string = UserStatus.PENDING_EMAIL_VERIFICATION;
    private _createdAt: Date;
    private _updatedAt: Date;




    public get concurrencySafeVersion(): number
    {
        return this.concurrencyVersion;
    };


    public set concurrencySafeVersion(concurrencySafeVersion: number)
    {
        this.concurrencyVersion = concurrencySafeVersion;
    };


    public get userId(): UserId
    {
        return this.id;
    };


    public set userId(userId: UserId)
    {
        this.id = userId;
    };

    public get email(): Email
    {
        return this._email;
    }

    public set email(email: Email)
    {
        this._email = email;
    }
    public get password(): Password
    {
        return this._password;
    }

    public set password(password: Password)
    {
        this._password = password;
    }

    public get name(): Name
    {
        return this._name;
    }

    public set name(name: Name)
    {
        this._name = name;
    }

    public get status(): string
    {
        return this._status;
    }

    public set status(status: string)
    {
        this._status = status;
    }

    public get createdAt(): Date
    {
        return this._createdAt;
    }
    public set createdAt(value: Date)
    {
        this._createdAt = value;
    }

    public get updatedAt(): Date
    {
        return this._updatedAt;
    }
    public set updatedAt(value: Date)
    {
        this._updatedAt = value;
    }


    public register(userId: UserId, name: Name, email: Email, password: Password, ip: IP): void
    {
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




    public validatePreconditions(...args: string[]): void
    {
        throw new Error("Method not implemented.");
    }
    public validateInvariant(): void
    {
        throw new Error("Method not implemented.");
    }

}