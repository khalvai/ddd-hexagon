import { Body, Controller, Get, Inject, Ip, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RegisterCommand } from "src/modules/User/Application/Commands/RegisterCommand";
import { RegisterUseCase } from "src/modules/User/Application/UseCases/Register";
import { HttpRegisterCommand } from "src/modules/User/Infrastructure/Adapters/Input/Dto/HttpReginsterCommand";

@ApiTags("Authentication")
@Controller("Auth")
export default class UserHTTPPInputAdapter
{
    public constructor
        (
            @Inject(RegisterUseCase)
            private readonly _registerInputPort: RegisterUseCase,
        )
    { }
    @Post("/Register")
    public async registerNewUser(@Body() registerCommand: HttpRegisterCommand, @Ip() ip: string): Promise<void>
    {
        await this._registerInputPort.handle({
            ...registerCommand,
            ip: ip
        });
    }
    // @Post("/Login")
    // public async login(@Body() login: LoginCommand): Promise<LoginDto>
    // {
    //     return await this._loginInputPort.handle(login);
    // }
    // @Get("/VerifyEmailAddress/:emailVerificationToken")
    // public async verifyEmailAddress(@Param() emailVerificationToken: VerifyEmailAddressCommand): Promise<void>
    // {
    //     return this._verifyEmailAddressInputPort.handle(emailVerificationToken);
    // }
    // @Get("test")
    // public async test(): Promise<void>
    // {
    //     const token = await this._tokenService.signAndEncrypt(JSON.stringify({ name: "bahman" }), "AUTH", 5);

    //     console.log(token);
    // }
}
