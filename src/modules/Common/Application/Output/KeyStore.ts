import { KeyPair } from "src/modules/Common/Infrastructure/Adapters/Output/JWKeyStore";

export const KeyStore = Symbol("KeyStore").valueOf();
export interface KeyStore {
    generate(): Promise<void>;
    getActiveKeyPair(): Promise<[string, KeyPair]>;
    getKeyPair(keyPairId: string): Promise<KeyPair>;
}
