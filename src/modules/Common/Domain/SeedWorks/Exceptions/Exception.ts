import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

export default abstract class Exception extends Error {
    constructor(public readonly message: string) {
        super(message);
    }
}


