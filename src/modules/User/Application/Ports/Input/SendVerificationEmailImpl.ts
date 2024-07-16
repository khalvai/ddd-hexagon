import { Inject } from "@nestjs/common";
import { CommandHandler } from "@nestjs/cqrs";
import { SigningService } from "src/modules/Common/Application/Output/SigningService";
import { TokenService } from "src/modules/Common/Application/Output/TokenService";
import Result from "src/modules/Common/Application/Result";
import { SendVerificationEmailCommand } from "src/modules/User/Application/Commands/SendVerificationEmailCommand";
import { EmailServiceProvider } from "src/modules/User/Application/Ports/Output/EmailServiceProvider";
import { Template } from "src/modules/User/Application/Ports/Output/Template";
import { SendVerificationEmail } from "src/modules/User/Application/UseCases/SendVerificationEmail";
import Email from "src/modules/User/Domain/Email";

@CommandHandler(SendVerificationEmailCommand)
export class SendVerificationEmailImp implements SendVerificationEmail {

    constructor(
        @Inject(TokenService) private readonly tokenService: TokenService,
        @Inject(Template) private readonly template: Template,
        @Inject(EmailServiceProvider) private readonly emailServicerProvider: EmailServiceProvider

    ) { }
    async execute(command: SendVerificationEmailCommand): Promise<Result<void>> {


        console.log("here in command");

        const token = await this.tokenService.signAndEncrypt(JSON.stringify(command), 4);

        const template = this.template.getVerifyEMailTemplate(token, command.email, command.ip);

        const email = Email.createFromValid(command.email);


        await this.emailServicerProvider.send(template, email);

        return { ok: undefined }

    }


}