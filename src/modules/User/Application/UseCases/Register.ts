import { CommandHandler } from "src/modules/Common/Application/CommandHandler";
import { RegisterCommand } from "src/modules/User/Application/Commands/RegisterCommand";

export const RegisterUseCase = Symbol("RegisterUseCase").valueOf();
export interface RegisterUseCase extends CommandHandler<RegisterCommand> { }