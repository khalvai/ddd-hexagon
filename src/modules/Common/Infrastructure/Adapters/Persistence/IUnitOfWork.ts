import { OnModuleInit } from "@nestjs/common";

export const IUnitOfWork = Symbol("IUnitOfWork").valueOf();
export interface IUnitOfWork 
{

    setupConnection(): Promise<void>;
    startTransaction(): Promise<void>;
    rollbackTransaction(): Promise<void>;
    commitTransaction(): Promise<void>;
}
