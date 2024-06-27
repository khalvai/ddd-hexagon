import { UserResponseMessages } from "ResponseMessages/user.response.messages";
import Result from "src/modules/Common/Application/Result";
import UserRepository from "src/modules/User/Application/Ports/Output/UserRepository";
import User from "src/modules/User/Domain/User";
import UserId from "src/modules/User/Domain/UserId";
import UserMapper from "src/modules/User/Infrastructure/Adapters/Output/Mapper/UserMapper";
import UserPersistenceModel from "src/modules/User/Infrastructure/Adapters/Output/Model/UserPersistenceModel";
import PrismaService from "src/modules/User/Infrastructure/Adapters/Output/Persistence/PrismaService";
import Notification from "src/modules/Common/Application/Notification";
import NewUserRegistered from "src/modules/User/Domain/Events/ChangeTracking/NewUserRegisterd";
import { Outbox, UserStatus } from "@prisma/client";
import { Prisma } from '@prisma/client';
export class PostgresqlUserRepository implements UserRepository
{

    constructor (private readonly prisma: PrismaService,
        private readonly userMapper: UserMapper

    ) { };

    async load(userId: UserId): Promise<Result<User>>
    {
        const userModel: UserPersistenceModel = "" as any;
        const z = await this.prisma.user.findUnique({
            where: {
                id: userId.value
            },

        });

        z.status.toString();

        if (userModel)
        {

            const user: User = this.userMapper.toDomain(userModel);

            return Result.ok(user);
        } else
        {
            const notification = new Notification();
            notification.addError(UserResponseMessages.USER_NOT_FOUND);
            return Result.fail(notification);
        }

    }
    async save(user: User): Promise<Result<void>>
    {

        const userModel: UserPersistenceModel = this.userMapper.toPersistence(user);
        const outboxes: Outbox[] = [];
        const events = user.getEvents();

        try
        {
            for (const event of events)
            {

                if (event.type === NewUserRegistered.name)
                {
                    outboxes.push({
                        id: event.id,
                        payload: event.payload,
                        eventType: event.type,
                        dispatched: false,
                        createdAt: new Date(Date.now())
                    });


                }

            }


            this.prisma.$transaction(async (tx) =>
            {
                this.create(userModel, tx);
                this.insertOutboxes(outboxes, tx);
            });

            return Result.ok();
        } catch (error)
        {
            console.log(error);
            const notification = new Notification();
            notification.addError(UserResponseMessages.FAILED_TRANSACTION);
            return Result.fail(notification);

        }
    }

    private async insertOutboxes(outboxes: Outbox[], tx: Prisma.TransactionClient)
    {
        tx.outbox.createMany({
            data: outboxes
        });

    }

    private create(userModel: UserPersistenceModel, tx: Prisma.TransactionClient)
    {


        tx.user.create({
            data: {
                id: userModel.id,
                name: userModel.name,
                email: userModel.email,
                password: userModel.password,
                status: userModel.status as UserStatus,
                updatedAt: userModel.updatedAt,
                createdAt: userModel.createdAt,
                concurrencySafeVersion: userModel.concurrencyVersion
            }
        });
    }
}