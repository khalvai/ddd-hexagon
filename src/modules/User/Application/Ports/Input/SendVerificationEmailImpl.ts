import { SendVerificationEmailCommand } from "src/modules/User/Application/Commands/SendVerificationEmailCommand";
import { SendVerificationEmail } from "src/modules/User/Application/UseCases/SendVerificationEmail";

export class SendVerificationEmailImp implements SendVerificationEmail
{

    constructor () { }
    handle(command: SendVerificationEmailCommand): void
    {





    }

}