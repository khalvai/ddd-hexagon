

export default class UserPersistenceModel
{

    id: string;
    email: string;
    name: string;
    password: string;
    status: string;
    concurrencyVersion: number;
    createdAt: Date;
    updatedAt: Date;

}