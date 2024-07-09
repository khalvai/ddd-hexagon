import Exception from "src/modules/Common/Domain/SeedWorks/Exceptions/Exception";

export default class NotValidInputException extends Exception {

    constructor(private readonly errorMessage: string) {
        super(errorMessage);
    }
}