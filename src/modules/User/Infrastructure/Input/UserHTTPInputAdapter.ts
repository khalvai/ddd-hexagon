import { Body, Controller, Get, HttpException, HttpStatus, Inject, Ip, Post, UseFilters } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";
import Result from "src/modules/Common/Application/Result";
import { HttpExceptionFilter } from "src/modules/Common/Infrastructure/Output/HttpExceptionFilter";
import { RegisterCommand } from "src/modules/User/Application/Commands/RegisterCommand";
import { RegisterUseCase } from "src/modules/User/Application/UseCases/Register";
import { HttpRegisterCommand } from "src/modules/User/Infrastructure/Input/Dto/HttpReginsterCommand";

@UseFilters(HttpExceptionFilter)
@ApiTags("Authentication")
@Controller("Auth")
export default class UserHTTPPInputAdapter {
    public constructor
        (
            private commandBus: CommandBus
        ) { }
    @Post("/Register")
    public async registerNewUser(@Body() registerCommand: HttpRegisterCommand, @Ip() ip: string): Promise<void> {



        const result = await this.commandBus.execute<RegisterCommand, Result<void>>(new RegisterCommand(registerCommand.email, registerCommand.password, registerCommand.confirmPassword, registerCommand.name, ip));

        if ("failure" in result) {
            throw result.failure;
        }

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
