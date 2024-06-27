import { CommandHandler } from "src/modules/Common/Application/CommandHandler";
import { SendVerificationEmailCommand } from "src/modules/User/Application/Commands/SendVerificationEmailCommand";

export const SendVerificationEmail = Symbol("SendVerificationEmail").valueOf();
export interface SendVerificationEmail extends CommandHandler<SendVerificationEmailCommand> { }