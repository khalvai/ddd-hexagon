import { JWK, JWS } from "node-jose";
import { Injectable } from "@nestjs/common";
import { SigningService } from "src/modules/Common/Application/Output/SigningService";

@Injectable()
export default class JWSigningService implements SigningService {
    public async sign(data: string, privateJWK: Awaited<ReturnType<typeof JWK.asKey>>, kid?: string, expiresAt?: Date): Promise<string> {
        const fields = { cty: "JWT" };


        if (!!kid) {
            fields['kid'] = kid;
        }
        if (!!expiresAt) {
            fields['expAt'] = expiresAt;
        }
        return await JWS.createSign({ format: "compact", alg: "RSA", fields }, privateJWK)
            .update(data)
            .final() as unknown as string;
    }
    public async verify(token: string, publicJWK: Awaited<Promise<ReturnType<typeof JWK.asKey>>>): Promise<string> {
        const verificationResult = await JWS.createVerify(publicJWK).verify(token);

        return verificationResult.payload.toString();
    }
}
