import Result from "src/modules/Common/Application/Result";



export const Publisher = Symbol("Publisher").valueOf();
export interface Publisher {


    publish(eventName: string, event: any): Promise<void>;
}