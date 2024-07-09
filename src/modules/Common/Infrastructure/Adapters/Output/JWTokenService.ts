import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { EncryptionService } from "src/modules/Common/Application/Output/EncryptionService";
import { KeyStore } from "src/modules/Common/Application/Output/KeyStore";
import { SigningService } from "src/modules/Common/Application/Output/SigningService";
import { TokenService } from "src/modules/Common/Application/Output/TokenService";

@Injectable()
export default class JWTokenService implements TokenService {
    public constructor
        (
            @Inject(SigningService)
            private readonly _signingService: SigningService,
            @Inject(EncryptionService)
            private readonly _encryptionService: EncryptionService,
            @Inject(KeyStore)
            private readonly _keyStore: KeyStore
        ) { }
    public async signAndEncrypt(data: string, expiresAtInMinutes: number): Promise<string> {
        const [keyId, { privateKey, publicKey }] = await this._keyStore.getActiveKeyPair();

        const toDay = new Date();
        const expirationDate = toDay.setMinutes(toDay.getMinutes() + expiresAtInMinutes);

        const signedToken = await this._signingService.sign(data, privateKey);
        const encryptedToken = await this._encryptionService.encrypt(signedToken, publicKey, keyId, new Date(expirationDate));

        return encryptedToken;
    }
    public async decryptAndVarify(token: string): Promise<string> {
        const { pid, expAt, ns } = this._getMetadata(token);


        if (new Date() > new Date(expAt)) {
            throw new UnauthorizedException();
        }
        const keyPair = await this._keyStore.getKeyPair(pid);

        if (!keyPair) {
            throw new UnauthorizedException();
        }
        const sinedUserData = await this._encryptionService.decrypt(token, keyPair.privateKey);

        const userData = await this._signingService.verify(sinedUserData, keyPair.publicKey);

        return userData;
    }
    public async sign(data: string, expiresAtInMinutes: number): Promise<string> {
        const [keyId, { privateKey }] = await this._keyStore.getActiveKeyPair();

        const toDay = new Date();
        const expirationDate = toDay.setMinutes(toDay.getMinutes() + expiresAtInMinutes);

        const signedToken = await this._signingService.sign(data, privateKey, keyId, new Date(expirationDate));

        return signedToken;
    }
    public async verify(token: string): Promise<string> {
        const { pid, expAt, ns } = this._getMetadata(token);

        if (new Date() > new Date(expAt)) {
            throw new UnauthorizedException("Token Expired");
        }
        const keyPair = await this._keyStore.getKeyPair(pid);

        if (!keyPair) {
            throw new UnauthorizedException();
        }
        const userData = await this._signingService.verify(token, keyPair.publicKey);

        return userData;
    }
    private _getMetadata(token: string): { pid: string, expAt: string; ns: string; } {
        const encodedHeader = token.split(".")[0];

        const { pid, expAt, ns } = JSON.parse(Buffer.from(encodedHeader, "base64").toString("utf8")) as { pid: string, expAt: string; ns: string; };

        return { pid, expAt, ns };
    }
}
