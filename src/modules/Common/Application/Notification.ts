export default class Notification {

    public errors: string[] = [];

    public addError(message: string): void {
        this.errors.push(message);
    }
    public hasErrors(): boolean {
        return this.errors.length > 0;
    }

}
