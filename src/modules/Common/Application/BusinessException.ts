import { HttpException, HttpExceptionOptions, HttpStatus } from "@nestjs/common";

export default abstract class BusinessException extends HttpException
{

    constructor (message: string, status: HttpStatus, options?: HttpExceptionOptions)
    {
        super(message, status, options);
    }
}