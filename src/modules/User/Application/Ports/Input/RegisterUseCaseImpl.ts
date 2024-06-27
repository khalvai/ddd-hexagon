import { Inject, UnprocessableEntityException } from "@nestjs/common";
import { HashService } from "src/modules/Common/Application/Output/HashService";
import Result from "src/modules/Common/Application/Result";
import { RegisterCommand } from "src/modules/User/Application/Commands/RegisterCommand";
import { UserRepository } from "src/modules/User/Application/Ports/Output/UserRepository";
import Email from "src/modules/User/Domain/Email";
import Name from "src/modules/User/Domain/Name";
import Password from "src/modules/User/Domain/Password";
import User from "src/modules/User/Domain/User";
import UserId from "src/modules/User/Domain/UserId";

export class RegisterUseCaseImpl
{


    public constructor (

        @Inject(HashService)
        private readonly hashService: HashService,

        @Inject(UserRepository)
        private readonly userRepository: UserRepository,
    ) { }

    async handel(command: RegisterCommand): Promise<Result<void>>
    {

        const emailResult = Email.createFromInput(command.email);
        const passwordResult = Password.createFromInput(command.password);
        const confirmPasswordResult = Password.createFromInput(command.confirmPassword);
        const nameResult = Name.createFromInput(command.name);

        let validationResult: Result<any> = null;

        if (passwordResult.isSuccess() && confirmPasswordResult.isSuccess())
        {
            const comparePasswordsResult = confirmPasswordResult.value.compareWithConfirm(passwordResult.value);

            validationResult = Result.combine([ emailResult, nameResult, passwordResult, confirmPasswordResult, comparePasswordsResult ]);
        }
        else
        {
            validationResult = Result.combine([ emailResult, passwordResult, confirmPasswordResult, nameResult ]);
        }
        if (validationResult.isFailure())
        {
            throw new UnprocessableEntityException(validationResult.getError().getMessages());
        }


        const hashedPassword = await this.hashService.createHash(passwordResult.value.value);
        ;
        const aUUID = UserId.create().value;

        const user: User = new User();
        user.register(UserId.createFromInput(aUUID.value).value, nameResult.value, emailResult.value, Password.createFromHashed(hashedPassword).value);



        this.userRepository.save(user);



        return Result.ok();
    };
}