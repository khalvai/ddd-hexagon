import * as jose from "node-jose";
import { Injectable } from "@nestjs/common";
import { JWK } from "node-jose";
import { IEncryptionService } from "src/modules/Common/Application/Output/IEncryptionService";

@Injectable()
export default class JWEncryptionService implements IEncryptionService
{
    public async encrypt(data: string, publicJWK: Awaited<Promise<ReturnType<typeof JWK.asKey>>>, namespace?: string, pid?: string, expiresAt?: Date): Promise<string>
    {
        const fields = { cty: "JWT" };

        if (!!namespace)
        {
            fields[ 'ns' ] = namespace;
        }
        if (!!pid)
        {
            fields[ 'pid' ] = pid;
        }
        if (!!expiresAt)
        {
            fields[ 'expAt' ] = expiresAt;
        }
        return await jose.JWE.createEncrypt({ format: "compact", fields }, publicJWK)
            .update(data)
            .final();
    }
    public async decrypt(encryptedData: string, privateJWK: Awaited<Promise<ReturnType<typeof JWK.asKey>>>): Promise<string>
    {
        const decryptionResult = await jose.JWE.createDecrypt(privateJWK as never).decrypt(encryptedData);

        return decryptionResult.payload.toString();
    }
}
