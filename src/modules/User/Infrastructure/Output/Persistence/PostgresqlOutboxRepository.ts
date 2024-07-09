import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { OutboxRepository } from "src/modules/User/Application/Ports/Output/OutboxRepository";
import { OutboxModel } from "src/modules/User/Infrastructure/Output/Mapper/OutboxMapper";
import { PrismaPostgresqlOutboxRepo } from "src/modules/User/Infrastructure/Output/Persistence/PostgresqlOutboxRepo";
import PrismaService from "src/modules/User/Infrastructure/Output/Persistence/PrismaService";
import Result from "src/modules/Common/Application/Result";

@Injectable()
export default class PrismaPostgresqlOutboxRepositoryImpl implements PrismaPostgresqlOutboxRepo {
    constructor(private readonly prisma: PrismaService) { }


    async dispatched(eventId: string): Promise<void> {

        this.prisma.outbox.update(

            {
                where: {
                    id: eventId
                },
                data: {
                    dispatched: true
                }
            }
        );

        return;

    }
    ;

    async save(outboxes: OutboxModel[], connection: Prisma.TransactionClient): Promise<void> {

        console.log(outboxes);

        await connection.outbox.createMany({
            data: outboxes
        });

        return;


    }



    async getUnDispatched(): Promise<Result<OutboxModel[]>> {
        const outboxes: OutboxModel[] = await this.prisma.outbox.findMany({
            where: {
                dispatched: false
            }
        });

        return { ok: outboxes };


    }


}