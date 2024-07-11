import DomainEvent from "src/modules/Common/Domain/DomainEvent";
import IP from "src/modules/User/Domain/IP";
import User from "../../User";

interface EventPayload {
    userId: string;
    email: string;
    name: string;
    ip: string;
}
export default class NewUserRegistered extends DomainEvent<EventPayload, "Integration"> {
    private constructor(userId: string, email: string, name: string, ip: string) {
        super({ email, name, userId, ip });
    }

    static of(user: User, ip: IP): NewUserRegistered {
        return new NewUserRegistered(user.userId.value, user.email.value, user.name.value, ip.value)
    }

}
