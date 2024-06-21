export const ITokenService = Symbol("ITokenService").valueOf();

export interface ITokenService
{
    signAndEncrypt(data: string, namespace: string, expiresAtInMinutes: number): Promise<string>;
    decryptAndVarify(token: string, namespace: string): Promise<string>;
    sign(data: string, namespace: string, expiresAtInMinutes: number): Promise<string>;
    verify(token: string, namespace: string): Promise<string>;
}
