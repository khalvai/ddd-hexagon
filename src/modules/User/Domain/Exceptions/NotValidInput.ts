import { HttpStatus } from "@nestjs/common";
import BusinessException from "src/modules/Common/Application/BusinessException";


export class NotValidInput extends BusinessException
{

    constructor (messages: string[])
    {
        super("", HttpStatus.BAD_REQUEST, {
            cause: messages
        });
    };
}