import { HttpException, Inject, UnprocessableEntityException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { HashService } from "src/modules/Common/Application/Output/HashService";
import Result from "src/modules/Common/Application/Result";
import ValueObject from "src/modules/Common/Domain/ValueObject";
import { RegisterCommand } from "src/modules/User/Application/Commands/RegisterCommand";
import { UserRepository } from "src/modules/User/Application/Ports/Output/UserRepository";
import { RegisterUseCase } from "src/modules/User/Application/UseCases/Register";
import Email from "src/modules/User/Domain/Email";
import IP from "src/modules/User/Domain/IP";
import Name from "src/modules/User/Domain/Name";
import Password from "src/modules/User/Domain/Password";
import User from "src/modules/User/Domain/User";
import UserId from "src/modules/User/Domain/UserId";


@CommandHandler(RegisterCommand)
export class RegisterUseCaseImpl implements RegisterUseCase {


    public constructor(

        @Inject(HashService)
        private readonly hashService: HashService,

        @Inject(UserRepository)
        private readonly userRepository: UserRepository,
    ) { }
    async execute(command: RegisterCommand): Promise<Result<void>> {

        // const emailResult = Email.createFromInput(command.email);
        // const passwordResult = Password.createFromInput(command.password);
        // const confirmPasswordResult = Password.createFromInput(command.confirmPassword);
        // const nameResult = Name.createFromInput(command.name);
        // const ipResult = IP.createFromInput(command.ip);




        // const result = Result.combine([emailResult, passwordResult, confirmPasswordResult, nameResult, ipResult]);

        // if (result.isFailure()) {

        //     throw new NotValidInput(result.getError().getErrors());
        // }


        // const hashedPassword = await this.hashService.createHash(passwordResult.value.value);
        // ;
        // const aUUID = UserId.create().value;



        // const user: User = new User();


        // user.register(UserId.createFromInput(aUUID.value).value, nameResult.value, emailResult.value, Password.createFromHashed(hashedPassword).value, ipResult.value);





        // await this.userRepository.save(user);



        return { ok: undefined }




    }


}