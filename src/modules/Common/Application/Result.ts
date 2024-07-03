import Notification from "src/modules/Common/Application/Notification";
export default class Result<T>
{
    private constructor (
        private _value: T | null,
        private notification: Notification | string,
    ) { }
    public static ok<U>(value?: U): Result<U>
    {
        return new Result<U>(value, null);
    }
    public static fail<U>(notification: Notification | null | string): Result<U>
    {
        return new Result<U>(null, notification);
    }
    public isSuccess(): boolean
    {
        return this.notification === null;
    }
    public isFailure(): boolean
    {
        return this.notification !== null;
    }
    public get value(): T | null
    {
        if (this.isFailure())
        {
            throw new Error("Cannot get value from a failed result.");
        }
        return this._value;
    }
    public getError(): Notification | null
    {
        if (this.isSuccess())
        {
            throw new Error("Cannot get error from a successful result.");
        }

        if (typeof this.notification === "string")
        {

            const notification = new Notification();
            notification.addError(this.notification);
            this.notification = notification;
        }
        return this.notification;
    }
    public static combine(results: Result<any>[]): Result<any>
    {
        const notifications: Notification[] = [];

        for (const result of results)
        {

            if (result.isFailure())
            {
                notifications.push(result.getError());
            }
        }


        if (notifications.length > 0)
        {
            const combinedNotification = new Notification();

            for (const notification of notifications)
            {
                combinedNotification.combineWith(notification);
            }


            return Result.fail(combinedNotification);
        }
        return Result.ok();
    }

    public static technicalException(e){
        
    }
}
