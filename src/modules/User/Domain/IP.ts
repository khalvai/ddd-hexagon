import Result from "src/modules/Common/Application/Result";
import ValueObject from "src/modules/Common/Domain/SeedWorks/ValueObject";
import Notification from "src/modules/Common/Application/Notification";
import { isIP } from "net";
export default class IP extends ValueObject<string> {
    public static INVALID_IP_ADDRESS = "INVALID_IP_ADDRESS";

    public static createFromInput(ip: string): Result<IP, Notification> {

        if (!isIP(ip)) {
            const notification = new Notification();
            notification.addError(IP.INVALID_IP_ADDRESS);
            return { failure: notification }

        }

        return { ok: new IP(ip) }
    }
    public static createFromValid(ip: string): IP {
        return new IP(ip)
    }
}
