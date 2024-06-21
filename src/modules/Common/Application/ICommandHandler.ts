export interface ICommandHandler<ICommand, IResult = void>
{
    handle(command: ICommand): IResult;
}
