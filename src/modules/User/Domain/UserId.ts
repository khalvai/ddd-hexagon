import Notification from "src/modules/Common/Application/Notification";
import Result from "src/modules/Common/Application/Result";
import UUIDV4 from "src/modules/Common/Domain/SeedWorks/UUIDV4";


export default class UserId extends UUIDV4
{
    public static createFromInput(aUUID: string): Result<UserId>
    {

        const notification = new Notification();
        const uuid = String(aUUID).trim();

        if (!UserId.isValid(uuid))
        {
            notification.addError("شناسه کاربر معتبر نیست");
            return Result.fail(notification);
        }
        return Result.ok(new UserId({ value: uuid }));
    }

}
