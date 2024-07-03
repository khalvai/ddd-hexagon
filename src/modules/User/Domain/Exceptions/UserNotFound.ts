import { HttpStatus } from "@nestjs/common";
import { UserResponseMessages } from "ResponseMessages/user.response.messages";
import BusinessException from "src/modules/Common/Application/BusinessException";


export class UserNotFoundException extends BusinessException
{


    constructor ()
    {

        super(UserResponseMessages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
}
