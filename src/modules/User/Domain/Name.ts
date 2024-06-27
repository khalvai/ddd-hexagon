import Result from "src/modules/Common/Application/Result";
import ValueObject from "src/modules/Common/Domain/SeedWorks/ValueObject";
import Notification from "src/modules/Common/Application/Notification";

export default class Name extends ValueObject<string>
{
    public static NAME_CAN_NOT_BE_AN_EMPTY_STRING = "NAME_CAN_NOT_BE_AN_EMPTY_STRING";
    public static INVALID_NAME_LENGTH = "INVALID_NAME_LENGTH";

    public static createFromInput(aName: string): Result<Name>
    {
        const notification = new Notification();
        const name = String(aName).trim();

        if (name.length === 0)
        {
            notification.addError(Name.NAME_CAN_NOT_BE_AN_EMPTY_STRING);
        }
        if ((name.length < 4) || (name.length > 20))
        {
            notification.addError(Name.INVALID_NAME_LENGTH);
        }
        if (notification.hasErrors())
        {
            return Result.fail(notification);
        }
        return Result.ok(new Name({ value: name }));
    }
    public static createFromValid(aName: string): Result<Name>
    {
        return Result.ok(new Name({ value: aName }));
    }
}
