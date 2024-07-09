import { ApiProperty } from "@nestjs/swagger";
import { RegisterCommand } from "src/modules/User/Application/Commands/RegisterCommand";

export class HttpRegisterCommand implements RegisterCommand
{
    ip: string;

    @ApiProperty({
        required: true
    })
    email: string;
    @ApiProperty({
        required: true
    })
    password: string;
    @ApiProperty({
        required: true
    })
    confirmPassword: string;
    @ApiProperty({
        required: true
    })
    name: string;
}