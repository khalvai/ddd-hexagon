import { KeyPair } from "src/modules/Common/Infrastructure/Adapters/Output/JWKeyStore";

export const IKeyStore = Symbol("IKeyStore").valueOf();
export interface IKeyStore
{
    generate(): Promise<void>;
    getActiveKeyPair(): Promise<[ string, KeyPair ]>;
    getKeyPair(keyPairId: string): Promise<KeyPair>;
}
