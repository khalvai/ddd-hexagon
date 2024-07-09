import { JWK } from "node-jose";

export const EncryptionService = Symbol("EncryptionService").valueOf();
export interface EncryptionService {
    encrypt(data: string, publicJWK: Awaited<ReturnType<typeof JWK.asKey>>, kid?: string, expiresAt?: Date): Promise<string>;
    decrypt(encryptedData: string, privateJWK: Awaited<ReturnType<typeof JWK.asKey>>): Promise<string>;
}
