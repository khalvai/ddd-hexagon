export interface IQueryHandler<IQuery, IDto>
{
    handle(query: IQuery): Promise<IDto>;
}
