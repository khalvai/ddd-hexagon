import { JWK } from "node-jose";

export const IEncryptionService = Symbol("IEnryptionService").valueOf();
export interface IEncryptionService
{
    encrypt(data: string, publicJWK: Awaited<ReturnType<typeof JWK.asKey>>, namespace?: string, pid?: string, expiresAt?: Date): Promise<string>;
    decrypt(encryptedData: string, privateJWK: Awaited<ReturnType<typeof JWK.asKey>>): Promise<string>;
}
