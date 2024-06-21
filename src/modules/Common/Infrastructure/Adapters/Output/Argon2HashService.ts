import { IHashService } from "src/modules/Common/Application/Output/IHashService";
import * as argon2 from "argon2";

export class Argon2HashService implements IHashService
{
    public async createHash(data: string): Promise<string>
    {
        return await argon2.hash(data);
    }
    public async compare(hash: string, data: string): Promise<boolean>
    {
        return await argon2.verify(hash, data);
    }
}
