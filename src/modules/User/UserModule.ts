import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { Prisma } from "@prisma/client";
import { EncryptionService } from "src/modules/Common/Application/Output/EncryptionService";
import { HashService } from "src/modules/Common/Application/Output/HashService";
import { KeyStore } from "src/modules/Common/Application/Output/KeyStore";
import { SigningService } from "src/modules/Common/Application/Output/SigningService";
import { TokenService } from "src/modules/Common/Application/Output/TokenService";
import { Argon2HashService } from "src/modules/Common/Infrastructure/Adapters/Output/Argon2HashService";
import JWEncryptionService from "src/modules/Common/Infrastructure/Adapters/Output/JWEncryptionService";
import JWKeyStore from "src/modules/Common/Infrastructure/Adapters/Output/JWKeyStore";
import JWSigningService from "src/modules/Common/Infrastructure/Adapters/Output/JWSigningService";
import JWTokenService from "src/modules/Common/Infrastructure/Adapters/Output/JWTokenService";
import { RegisterUseCaseImpl } from "src/modules/User/Application/Ports/Input/RegisterUseCaseImpl";
import { EmailServiceProvider } from "src/modules/User/Application/Ports/Output/EmailServiceProvider";
import { OutboxRepository } from "src/modules/User/Application/Ports/Output/OutboxRepository";
import { Template } from "src/modules/User/Application/Ports/Output/Template";
import { UserRepository } from "src/modules/User/Application/Ports/Output/UserRepository";
import UserHTTPPInputAdapter from "src/modules/User/Infrastructure/Adapters/Input/UserHTTPInputAdapter";
import { LiaraEmailServiceProvider } from "src/modules/User/Infrastructure/Adapters/Output/LiaraEmailServiceProvider";
import { OutboxMapper } from "src/modules/User/Infrastructure/Adapters/Output/Mapper/OutboxMapper";
import UserMapper from "src/modules/User/Infrastructure/Adapters/Output/Mapper/UserMapper";
import PostgresqlOutboxRepository from "src/modules/User/Infrastructure/Adapters/Output/Persistence/PostgresqlOutboxRepository";
import { PostgresqlUserRepository } from "src/modules/User/Infrastructure/Adapters/Output/Persistence/PostgresqlUserRepository";
import PrismaModule from "src/modules/User/Infrastructure/Adapters/Output/Persistence/PrismaModul";
import { EJSTemplate } from "src/modules/User/Infrastructure/Adapters/Output/Template/EjsTemplate";


@Module({
    imports: [
        PrismaModule,
        CqrsModule,
    ],
    controllers: [ UserHTTPPInputAdapter ],
    providers: [
        {
            provide: UserRepository,
            useClass: PostgresqlUserRepository,
        },
        {
            provide: PostgresqlOutboxRepository,
            useClass: PostgresqlOutboxRepository
        },
        {
            provide: OutboxRepository,
            useClass: PostgresqlOutboxRepository
        },
        {
            provide: TokenService,
            useClass: JWTokenService

        },
        {
            provide: EncryptionService,
            useClass: JWEncryptionService
        },
        {
            provide: KeyStore,
            useClass: JWKeyStore
        },
        {
            provide: HashService,
            useClass: Argon2HashService
        },
        {
            provide: SigningService,
            useClass: JWSigningService
        },
        {
            provide: Template,
            useClass: EJSTemplate
        },
        {
            provide: EmailServiceProvider,
            useClass: LiaraEmailServiceProvider
        },
        RegisterUseCaseImpl,
        OutboxMapper,
        UserMapper,
    ]
})
export class UserModule { }