import Result from "src/modules/Common/Application/Result";
import ValueObject from "src/modules/Common/Domain/SeedWorks/ValueObject";
import Notification from "src/modules/Common/Application/Notification";

export default class IP extends ValueObject<string>
{
    public static NAME_CAN_NOT_BE_AN_EMPTY_STRING = "NAME_CAN_NOT_BE_AN_EMPTY_STRING";
    public static INVALID_NAME_LENGTH = "INVALID_NAME_LENGTH";

    public static createFromInput(ip: string): Result<IP>
    {
        const notification = new Notification();
        const name = String(ip).trim();

        const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
        const ipv6Pattern = /^(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}$/;


        if (!ipv4Pattern.test(ip) && !ipv6Pattern.test(ip))
        {
            const notification = new Notification();
            notification.addError("Invalid IP address");
            return Result.fail(notification);

        }


        return Result.ok(new IP({ value: name }));
    }
    public static createFromValid(ip: string): Result<IP>
    {
        return Result.ok(new IP({ value: ip }));
    }
}
