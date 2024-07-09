import Notification from "src/modules/Common/Application/Notification";
import Result from "src/modules/Common/Application/Result";
import UUID4 from "src/modules/Common/Domain/UUID4";

export default class UserId extends UUID4 {

    public static createFromInput(uuid: string): Result<UserId, Notification> {

        const trimUUID = String(uuid).trim();

        if (!UserId.isValid(trimUUID)) {
            const notification = new Notification();

            notification.addError("INVALID_ID");

            return {
                failure: notification
            };
        }
        return { ok: new UserId(trimUUID) };
    }

    public static fromValid(uuid4: string): UUID4 {
        return new UserId(uuid4)
    }

}
