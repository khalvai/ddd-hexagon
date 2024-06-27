import ValueObject from "src/modules/Common/Domain/SeedWorks/ValueObject";
import Notification from "src/modules/Common/Application/Notification";
import Result from "src/modules/Common/Application/Result";
export default class Password extends ValueObject<string>
{


    public static PASSWORD_COULD_NOT_BE_AN_EMPTY_STRING = "نام نمایشی نمیتواند خالی باشد";
    public static INVALID_LENGTH = "رمز عبور باید بین ۸ الی ۲۰ کاراکتر باشد";
    public static PASSWORD_NOT_MATCH = "گذرواژه‌های وارد شده همخوانی ندارند ";

    private static _isValid(aPassword: string): Notification
    {
        const notification = new Notification();

        if (aPassword.length === 0)
        {
            notification.addError(Password.PASSWORD_COULD_NOT_BE_AN_EMPTY_STRING);
        }
        if ((aPassword.length < 8) || (aPassword.length > 20))
        {
            notification.addError(Password.INVALID_LENGTH);
        }
        return notification;
    }
    public static createFromInput(aPassword: string): Result<Password>
    {
        const password = String(aPassword).trim();

        const notification = Password._isValid(password);
        if (notification.hasErrors())
        {
            return Result.fail(notification);
        }
        return Result.ok(new Password({ value: password }));
    }
    public static createFromValid(aPassword: string): Result<Password>
    {
        return Result.ok(new Password({ value: aPassword }));
    }
    public static createFromHashed(aHashedPassword: string): Result<Password>
    {
        return Result.ok(new Password({ value: aHashedPassword }));
    }
    public compareWithConfirm(aPassword: Password): Result<Password>
    {
        const notification = new Notification();

        if (!aPassword.equals(this))
        {
            notification.addError(Password.PASSWORD_NOT_MATCH);
            return Result.fail(notification);
        }
        return Result.ok(aPassword);
    }
}
