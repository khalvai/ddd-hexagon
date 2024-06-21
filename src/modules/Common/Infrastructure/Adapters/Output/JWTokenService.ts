import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { IEncryptionService } from "src/modules/Common/Application/Output/IEncryptionService";
import { IKeyStore } from "src/modules/Common/Application/Output/IKeyStore";
import { ISigningService } from "src/modules/Common/Application/Output/ISigningService";
import { ITokenService } from "src/modules/Common/Application/Output/ITokenService";

@Injectable()
export default class JWTokenService implements ITokenService
{
    public constructor
        (
            @Inject(ISigningService)
            private readonly _signingService: ISigningService,
            @Inject(IEncryptionService)
            private readonly _encryptionService: IEncryptionService,
            @Inject(IKeyStore)
            private readonly _keyStore: IKeyStore
        )
    { }
    public async signAndEncrypt(data: string, namespace: string, expiresAtInMinutes: number): Promise<string>
    {
        const [ keyId, { privateKey, publicKey } ] = await this._keyStore.getActiveKeyPair();

        const toDay = new Date();
        const expirationDate = toDay.setMinutes(toDay.getMinutes() + expiresAtInMinutes);

        const signedToken = await this._signingService.sign(data, privateKey);
        const encryptedToken = await this._encryptionService.encrypt(signedToken, publicKey, namespace, keyId, new Date(expirationDate));

        return encryptedToken;
    }
    public async decryptAndVarify(token: string, namespace: string): Promise<string>
    {
        const { pid, expAt, ns } = this._getMetadata(token);

        if (namespace !== ns)
        {
            throw new UnauthorizedException("Unrelated Token");
        }
        if (new Date() > new Date(expAt))
        {
            throw new UnauthorizedException();
        }
        const keyPair = await this._keyStore.getKeyPair(pid);

        if (!keyPair)
        {
            throw new UnauthorizedException();
        }
        const sinedUserData = await this._encryptionService.decrypt(token, keyPair.privateKey);

        const userData = await this._signingService.verify(sinedUserData, keyPair.publicKey);

        return userData;
    }
    public async sign(data: string, namespace: string, expiresAtInMinutes: number): Promise<string>
    {
        const [ keyId, { privateKey } ] = await this._keyStore.getActiveKeyPair();

        const toDay = new Date();
        const expirationDate = toDay.setMinutes(toDay.getMinutes() + expiresAtInMinutes);

        const signedToken = await this._signingService.sign(data, privateKey, namespace, keyId, new Date(expirationDate));

        return signedToken;
    }
    public async verify(token: string, namespace: string): Promise<string>
    {
        const { pid, expAt, ns } = this._getMetadata(token);

        if (ns !== namespace)
        {
            throw new UnauthorizedException("Unrelated Token");
        }
        if (new Date() > new Date(expAt))
        {
            throw new UnauthorizedException("Token Expired");
        }
        const keyPair = await this._keyStore.getKeyPair(pid);

        if (!keyPair)
        {
            throw new UnauthorizedException();
        }
        const userData = await this._signingService.verify(token, keyPair.publicKey);

        return userData;
    }
    private _getMetadata(token: string): { pid: string, expAt: string; ns: string; }
    {
        const encodedHeader = token.split(".")[ 0 ];

        const { pid, expAt, ns } = JSON.parse(Buffer.from(encodedHeader, "base64").toString("utf8")) as { pid: string, expAt: string; ns: string; };

        return { pid, expAt, ns };
    }
}
