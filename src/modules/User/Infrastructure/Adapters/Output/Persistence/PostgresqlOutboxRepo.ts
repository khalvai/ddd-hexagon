import { Prisma } from "@prisma/client";
import { OutboxRepository } from "src/modules/User/Application/Ports/Output/OutboxRepository";


export const PrismaPostgresqlOutboxRepo = Symbol('PrismaPostgresqlOutboxRepo').valueOf();
export interface PrismaPostgresqlOutboxRepo extends OutboxRepository<Prisma.TransactionClient> { }