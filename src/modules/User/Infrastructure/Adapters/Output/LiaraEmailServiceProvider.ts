import Result from "src/modules/Common/Application/Result";
import { EmailServiceProvider } from "src/modules/User/Application/Ports/Output/EmailServiceProvider";
import Email from "src/modules/User/Domain/Email";


export class LiaraEmailServiceProvider implements EmailServiceProvider {
    async send(template: string, to: Email): Promise<Result<void>> {

        // talk to a 3rd party to send email

        return { ok: undefined };
    }
}