import { Inject, } from "@nestjs/common";
import { CommandHandler } from "@nestjs/cqrs";
import { HashService } from "src/modules/Common/Application/Output/HashService";
import Result from "src/modules/Common/Application/Result";
import { RegisterCommand } from "src/modules/User/Application/Commands/RegisterCommand";
import { UserRepository } from "src/modules/User/Application/Ports/Output/UserRepository";
import { RegisterUseCase } from "src/modules/User/Application/UseCases/Register";
import Email from "src/modules/User/Domain/Email";
import IP from "src/modules/User/Domain/IP";
import Name from "src/modules/User/Domain/Name";
import Password from "src/modules/User/Domain/Password";
import User from "src/modules/User/Domain/User";
import UserId from "src/modules/User/Domain/UserId";
import Notification from "src/modules/Common/Application/Notification";
import NotValidInputException from "src/modules/Common/Domain/Exceptions/NotValidInput";
import AlreadyExistsException from "src/modules/Common/Domain/Exceptions/AlreadyExistsException";


@CommandHandler(RegisterCommand)
export class RegisterUseCaseImpl implements RegisterUseCase {


    public constructor(

        @Inject(HashService)
        private readonly hashService: HashService,

        @Inject(UserRepository)
        private readonly userRepository: UserRepository,
    ) { }
    async execute(command: RegisterCommand): Promise<Result<void>> {

        const emailResult = Email.createFromInput(command.email);
        const passwordResult = Password.createFromInput(command.password);
        const confirmPasswordResult = Password.createFromInput(command.confirmPassword);
        const nameResult = Name.createFromInput(command.name);
        const ipResult = IP.createFromInput(command.ip);

        console.log("here");

        if (
            "failure" in emailResult ||
            "failure" in passwordResult ||
            "failure" in confirmPasswordResult ||
            "failure" in nameResult ||
            "failure" in ipResult
        ) {
            const notification = new Notification()
            notification.combineWithResult(emailResult, passwordResult, confirmPasswordResult, nameResult, ipResult)
            throw new NotValidInputException(notification.errors)
        }


        const isItNull = (await this.userRepository.loadByEmail(emailResult.ok)).isNull()

        if (!isItNull) {
            throw new AlreadyExistsException('USER_ALREADY_EXISTS')
        }


        const hashedPassword = await this.hashService.createHash(passwordResult.ok.value);

        const uuid = UserId.create()


        const user: User = new User();


        user.register(uuid, nameResult.ok, emailResult.ok, Password.createFromHashed(hashedPassword), ipResult.ok);

        await this.userRepository.save(user);


        return { ok: undefined }




    }


}

