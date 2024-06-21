import { PoolClient } from "pg";

export const IPool = Symbol("IPool").valueOf();
export interface IPool
{
    getConnection(): Promise<PoolClient>;
    releaseConnection(): void;
    isConnectionHealthy(): Promise<boolean>;
}
