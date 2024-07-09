import Exception from "src/modules/Common/Domain/Exceptions/Exception";
class UserNotFoundException extends Exception {
    constructor() {
        super("USER_NOT_FOUND");

    };

}

export default new UserNotFoundException()

