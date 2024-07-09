export const TokenService = Symbol("TokenService").valueOf();

export interface TokenService {
    signAndEncrypt(data: string, expiresAtInMinutes: number): Promise<string>;
    decryptAndVarify(token: string): Promise<string>;
    sign(data: string, expiresAtInMinutes: number): Promise<string>;
    verify(token: string): Promise<string>;
}
