import { ICommandHandler } from "@nestjs/cqrs";
import { CommandHandler } from "src/modules/Common/Application/CommandHandler";
import Result from "src/modules/Common/Application/Result";
import { RegisterCommand } from "src/modules/User/Application/Commands/RegisterCommand";

export interface RegisterUseCase extends ICommandHandler<RegisterCommand, Result<void>> { }