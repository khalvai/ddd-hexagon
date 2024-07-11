import Exception from "./Exception";

export class NotFoundException extends Exception {

    constructor(errorMessag: string) {
        super(errorMessag)
    }
}