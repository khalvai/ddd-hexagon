import { JWK } from "node-jose";

export const SigningService = Symbol("SigningService").valueOf();
export interface SigningService {
    sign(data: string, privateJWK: Awaited<ReturnType<typeof JWK.asKey>>, kid?: string, expiresAt?: Date): Promise<string>;
    verify(token: string, publicJWK: Awaited<ReturnType<typeof JWK.asKey>>): Promise<string>;
}
