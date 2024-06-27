import { AutomapperModule } from "@automapper/nestjs";
import { Module } from "@nestjs/common";
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
import { UserRepository } from "src/modules/User/Application/Ports/Output/UserRepository";
import { RegisterUseCase } from "src/modules/User/Application/UseCases/Register";
import UserHTTPPInputAdapter from "src/modules/User/Infrastructure/Adapters/Input/UserHTTPInputAdapter";

import { PostgresqlUserRepository } from "src/modules/User/Infrastructure/Adapters/Output/Persistence/PostgresqlUserRepository";
import PrismaModule from "src/modules/User/Infrastructure/Adapters/Output/Persistence/PrismaModul";


@Module({
    imports: [
        PrismaModule, ],
    controllers: [ UserHTTPPInputAdapter ],
    providers: [

        {
            provide: UserRepository,
            useClass: PostgresqlUserRepository
        },
        {
            provide: RegisterUseCase,
            useClass: RegisterUseCaseImpl
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
        }

    ]
})
export class UserModule { }