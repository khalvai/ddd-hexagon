import { ICommandHandler } from "@nestjs/cqrs";
import Result from "src/modules/Common/Application/Result";
import { SendVerificationEmailCommand } from "src/modules/User/Application/Commands/SendVerificationEmailCommand";

export interface SendVerificationEmail extends ICommandHandler<SendVerificationEmailCommand, Result<void>> { }