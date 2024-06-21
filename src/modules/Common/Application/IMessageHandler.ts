export interface IMessageHandler<ICommand, IResult = void>
{
    handle(message: ICommand): IResult;
}
