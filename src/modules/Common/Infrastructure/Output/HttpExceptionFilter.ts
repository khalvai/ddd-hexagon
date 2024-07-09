import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    InternalServerErrorException
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import NotValidInputException from 'src/modules/Common/Domain/Exceptions/NotValidInput';
// import * as Sentry from '@sentry/node';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
    ) { }

    catch(exception: HttpException, host: ArgumentsHost): any {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();
        let message: any = "INTERNAL_SERVER_ERROR";
        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;



        const responseBody = {
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            message
        };



        if (exception instanceof HttpException && exception.getStatus() !== 500) {
            responseBody.message = exception.getResponse();
        }




        if (exception instanceof NotValidInputException) {
            responseBody.message = exception.cause;
        }




        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);

        if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {


            const requestDetail = {
                path: httpAdapter.getRequestUrl(ctx.getRequest()),
                method: httpAdapter.getRequestMethod(ctx.getRequest()),
                error: exception
            };
            console.log(requestDetail);

        }
    }
}
