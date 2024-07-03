import Result from "src/modules/Common/Application/Result";
import Email from "src/modules/User/Domain/Email";

export const EmailServiceProvider = Symbol('EmailServiceProvider').valueOf();
export interface EmailServiceProvider
{

    send(template: string, to: Email): Promise<Result<void>>;
}