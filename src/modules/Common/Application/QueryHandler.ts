export interface QueryHandler<Query, Dto>
{
    handle(query: Query): Promise<Dto>;
}
