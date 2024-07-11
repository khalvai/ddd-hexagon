import Exception from "src/modules/Common/Domain/Exceptions/Exception";

export default class NotValidInputException extends Exception {

    constructor(public readonly errorMessages: string[]) {
        super(errorMessages[0]);
    }
}