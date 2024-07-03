import Result from "src/modules/Common/Application/Result";



export const Publisher = Symbol("Publisher").valueOf();
export interface Publisher
{


    publish(exchange: string, routingKey: string, data: any): Promise<Result<void>>;
    publishToQueue(queue: string, data: any): Promise<Result<void>>;
}