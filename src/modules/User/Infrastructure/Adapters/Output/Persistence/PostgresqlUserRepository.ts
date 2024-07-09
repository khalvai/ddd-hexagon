import { UserResponseMessages } from "ResponseMessages/user.response.messages";
import Result from "src/modules/Common/Application/Result";
import User from "src/modules/User/Domain/User";
import UserId from "src/modules/User/Domain/UserId";
import UserMapper from "src/modules/User/Infrastructure/Adapters/Output/Mapper/UserMapper";
import UserPersistenceModel from "src/modules/User/Infrastructure/Adapters/Output/Model/UserPersistenceModel";
import PrismaService from "src/modules/User/Infrastructure/Adapters/Output/Persistence/PrismaService";
import Notification from "src/modules/Common/Application/Notification";
import { UserStatus } from "@prisma/client";
import { Prisma } from '@prisma/client';
import { UserRepository } from "src/modules/User/Application/Ports/Output/UserRepository";
import Email from "src/modules/User/Domain/Email";
import NewUserRegistered from "src/modules/User/Domain/Events/Integration/NewUserRegistered";
import { OutboxRepository } from "src/modules/User/Application/Ports/Output/OutboxRepository";
import { OutboxMapper, OutboxModel } from "src/modules/User/Infrastructure/Adapters/Output/Mapper/OutboxMapper";
import { Inject, Injectable } from "@nestjs/common";
import PostgresqlOutboxRepository from "src/modules/User/Infrastructure/Adapters/Output/Persistence/PostgresqlOutboxRepository";
import UserNotFoundException from "src/modules/Common/Domain/SeedWorks/Exceptions/UserNotFoundException";


@Injectable()
export class PostgresqlUserRepository implements UserRepository {

    constructor(

        private readonly prisma: PrismaService,
        private readonly outboxRepository: PostgresqlOutboxRepository,
        private readonly userMapper: UserMapper,
        private readonly outboxMapper: OutboxMapper

    ) { };

    async load(userId: UserId): Promise<Result<User>> {
        const userModel = await this.prisma.user.findUnique({
            where: {
                id: userId.value
            },

        });

        if (userModel) {


            const user: User = this.userMapper.toDomain(userModel);

            return {
                ok: user
            };
        } else {
            return { failure: UserNotFoundException };
        }

    }

    async loadByEmail(email: Email): Promise<Result<User>> {
        const userModel = await this.prisma.user.findUnique({
            where: {
                email: email.value
            },

        });


        if (userModel) {

            const user = this.userMapper.toDomain(userModel);

            return { ok: user };
        } else {
            return { failure: UserNotFoundException };
        }

    }
    async save(user: User): Promise<Result<void>> {




        let userModel = this.userMapper.toPersistence(user);


        const outboxes: OutboxModel[] = [];
        const events = user.getEvents();
        for (const event of events) {
            console.log("the name of event", event.name);

            console.log(event);


            if (event.name === NewUserRegistered.name) {
                outboxes.push(this.outboxMapper.toPersistence(event));

            }

        }


        await this.prisma.$transaction(async (tx) => {
            // await this.create(userModel, tx);
            await this.outboxRepository.save(outboxes, tx);
        });

        return { ok: undefined };

    }

    private async create(userModel: UserPersistenceModel, tx: Prisma.TransactionClient) {


        await tx.user.create({
            data: {
                id: userModel.id,
                name: userModel.name,
                email: userModel.email,
                password: userModel.password,
                status: userModel.status as UserStatus,
                updatedAt: userModel.updatedAt,
                createdAt: userModel.createdAt,
                concurrencySafeVersion: userModel.concurrencySafeVersion
            }
        });


    }
}