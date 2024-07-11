import { ApiProperty } from "@nestjs/swagger";
import { RegisterCommand } from "src/modules/User/Application/Commands/RegisterCommand";

export class HttpRegisterCommand implements RegisterCommand {
    ip: string;

    @ApiProperty({
        required: true,
        example: "Khalvayozbek@gmail.com"
    })
    email: string;
    @ApiProperty({
        required: true,
        example: "SOME_STRONG_PASSWORD",
        description: "length must be between 8 and 20 characters"
    })
    password: string;
    @ApiProperty({
        required: true,
        example: "SOME_STRONG_PASSWORD",

    })
    confirmPassword: string;
    @ApiProperty({
        required: true,
        example: "khalvai"

    })
    name: string;
}