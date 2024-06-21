import * as crypto from "crypto";
import Result from "src/modules/Common/Application/Result";
import Errors from "src/modules/Common/Domain/SeedWorks/Errors/Errors";
import ValueObject from "src/modules/Common/Domain/SeedWorks/ValueObject";
import Notification from "src/modules/Common/Application/Notification";
export default class UUIDV4 extends ValueObject<string>
{
    private static _UUIDV4_VALIDATOR = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

    public static createEmpty(): Result<UUIDV4>
    {
        return Result.ok(new UUIDV4({ value: "" }));
    }
    public static create(): Result<UUIDV4>
    {
        return Result.ok(new UUIDV4({ value: crypto.randomUUID({ disableEntropyCache: true }) }));
    }
    public static fromValid(aUUIDV4: string): Result<UUIDV4>
    {
        return Result.ok(new UUIDV4({ value: aUUIDV4 }));
    }
    public static isValid(aUUIDV4: string): boolean
    {
        return new RegExp(UUIDV4._UUIDV4_VALIDATOR).test(aUUIDV4);
    }
    public static createFromInput(aUUID: string = ""): Result<UUIDV4>
    {
        const uuid = aUUID.trim();

        if (!UUIDV4._UUIDV4_VALIDATOR.test(uuid))
        {
            const notification = new Notification();
            notification.addError(Errors.INVALID_ID);
            return Result.fail(notification);
        }
        return Result.ok(new UUIDV4({ value: uuid }));
    }
}
