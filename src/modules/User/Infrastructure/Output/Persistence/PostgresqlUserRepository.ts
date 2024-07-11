import User from "src/modules/User/Domain/User";
import UserId from "src/modules/User/Domain/UserId";
import UserMapper from "src/modules/User/Infrastructure/Output/Mapper/UserMapper";
import UserPersistenceModel from "src/modules/User/Infrastructure/Output/Model/UserPersistenceModel";
import PrismaService from "src/modules/User/Infrastructure/Output/Persistence/PrismaService";
import { UserStatus } from "@prisma/client";
import { Prisma } from '@prisma/client';
import { UserRepository } from "src/modules/User/Application/Ports/Output/UserRepository";
import Email from "src/modules/User/Domain/Email";
import NewUserRegistered from "src/modules/User/Domain/Events/Integration/NewUserRegistered";
import { OutboxMapper, OutboxModel } from "src/modules/User/Infrastructure/Output/Mapper/OutboxMapper";
import { Injectable } from "@nestjs/common";
import PostgresqlOutboxRepository from "src/modules/User/Infrastructure/Output/Persistence/PostgresqlOutboxRepository";
import NullUser from "src/modules/User/Domain/NullUser";


@Injectable()
export class PostgresqlUserRepository implements UserRepository {

    constructor(

        private readonly prisma: PrismaService,
        private readonly outboxRepository: PostgresqlOutboxRepository,
        private readonly userMapper: UserMapper,
        private readonly outboxMapper: OutboxMapper

    ) { };

    async load(userId: UserId): Promise<User> {
        const userModel = await this.prisma.user.findUnique({
            where: {
                id: userId.value
            },

        });

        if (userModel) {


            const user: User = this.userMapper.toDomain(userModel);

            return user
        } else {
            return NullUser
        }

    }

    async loadByEmail(email: Email): Promise<User> {
        const userModel = await this.prisma.user.findUnique({
            where: {
                email: email.value
            },

        });


        if (userModel) {

            const user = this.userMapper.toDomain(userModel);
            return user
        }
        return NullUser

    }
    async save(user: User): Promise<void> {




        let userModel = this.userMapper.toPersistence(user);


        const outboxes: OutboxModel[] = [];
        const events = user.getEvents();
        for (const event of events) {

            if (event.name === NewUserRegistered.name) {
                outboxes.push(this.outboxMapper.toPersistence(event));

            }

        }


        await this.prisma.$transaction(async (tx) => {
            await this.create(userModel, tx);
            // await this.outboxRepository.save(outboxes, tx);
        });

        return

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