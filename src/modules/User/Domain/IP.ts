import Result from "src/modules/Common/Application/Result";
import ValueObject from "src/modules/Common/Domain/SeedWorks/ValueObject";
import Notification from "src/modules/Common/Application/Notification";
import { isIP } from "net";
export default class IP extends ValueObject<string>
{
    public static INVALID_IP_ADDRESS = "INVALID_IP_ADDRESS";

    public static createFromInput(ip: string): Result<IP>
    {

        if (!isIP(ip))
        {
            const notification = new Notification();
            notification.addError(IP.INVALID_IP_ADDRESS);
            return Result.fail(notification);

        }


        return Result.ok(new IP({ value: ip }));
    }
    public static createFromValid(ip: string): Result<IP>
    {
        return Result.ok(new IP({ value: ip }));
    }
}
