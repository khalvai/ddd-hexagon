export interface MessageHandler<Command, Result = void>
{
    handle(message: Command): Result;
}
