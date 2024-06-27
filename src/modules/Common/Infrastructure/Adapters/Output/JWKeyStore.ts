/* eslint-disable accessor-pairs */
import * as crypto from "crypto";
import * as fs from "fs";
import { Injectable, InternalServerErrorException, OnModuleInit } from "@nestjs/common";
import { JWK } from "node-jose";
import { KeyStore } from "src/modules/Common/Application/Output/KeyStore";

export interface KeyPair
{
    privateKey: Awaited<ReturnType<typeof JWK.asKey>>;
    publicKey: Awaited<ReturnType<typeof JWK.asKey>>;
}

@Injectable()
export default class JWKeyStore implements KeyStore, OnModuleInit
{
    private keyStore = new Map<string, string>();

    private numberOfDaysAKeypairShouldRemainInKeyStoreAfterRegenratingKeyPairInDays = 1;
    private refreshTokenLifetimeInDays = 7;

    public constructor ()
    {

    }
    async onModuleInit()
    {

        await this.loadKeys();


        if (!this.areThereAnyKeys)
        {
            await this.generate();
            await this.loadKeys();
        }

    }
    private get redundantKeysCount(): number
    {
        return this.keysLength - (this.refreshTokenLifetimeInDays + this.numberOfDaysAKeypairShouldRemainInKeyStoreAfterRegenratingKeyPairInDays);
    }
    public get keysLength(): number
    {
        return this.keyStore.size;
    }
    public async getActiveKeyPair(): Promise<[ string, KeyPair ]>
    {
        const [ kid, stringifiedKeys ] = Array.from(this.keyStore.entries())[
            this.keysLength - 1
        ];

        const { privateKey, publicKey } = JSON.parse(stringifiedKeys);

        const JWKs: KeyPair = {
            privateKey: await JWK.asKey(privateKey, "pem"),
            publicKey: await JWK.asKey(publicKey, "pem"),
        };

        return [ kid, JWKs ] as [ string, KeyPair ];
    }
    public async getKeyPair(keyId: string): Promise<KeyPair>
    {
        const stringifiedKeys = this.keyStore.get(keyId);

        const { privateKey, publicKey } = JSON.parse(stringifiedKeys);

        return {
            privateKey: await JWK.asKey(privateKey, "pem"),
            publicKey: await JWK.asKey(publicKey, "pem"),
        };
    }
    public async generate(): Promise<void>
    {
        const keysId = Date.now();

        try
        {
            const { privateKey, publicKey } = crypto.generateKeyPairSync(
                "rsa",
                {
                    modulusLength: 1024,
                    publicKeyEncoding: {
                        type: "spki",
                        format: "pem",
                    },
                    privateKeyEncoding: {
                        type: "pkcs1",
                        format: "pem",
                    },
                },
            );
            this.writeKeys(
                keysId.toString(),
                JSON.stringify({ privateKey, publicKey }),
            );
        } catch (error)
        {
            throw new InternalServerErrorException(error.message);
        }
    }
    public async loadKeys(): Promise<void>
    {
        try
        {
            let keyFilenames = fs.readdirSync(
                process.cwd() + "/keys",
                "utf8",
            );

            if (keyFilenames.length == 0)
            {
                await this.generate();
                keyFilenames = fs.readdirSync(
                    process.cwd() + "/keys",
                    "utf8",
                );

            }
            for (const filename of keyFilenames)
            {
                const keyPair = fs.readFileSync(
                    process.cwd() + `/keys/${ filename }`,
                    "utf-8",
                );

                const keyName = filename.split(".")[ 0 ];

                this.keyStore.set(keyName, keyPair);
            }
            this.revokeRedundantKeys();
        } catch (error)
        {
            throw new InternalServerErrorException("Error while reading files from FS @JWKeyStore.loadKeys()");
        }
    }
    private deleteKey(keyId: string): void
    {
        try
        {
            fs.unlinkSync(process.cwd() + "/keys/" + `${ keyId }.json`);
            this.keyStore.delete(keyId);
        } catch (error)
        {
            throw new InternalServerErrorException(
                "Error while removing key from FS @JWKeyStore.deleteKey()",
            );
        }
    }
    private areThereAnyRedundantKeys(): boolean
    {
        return (this.keysLength > (this.refreshTokenLifetimeInDays + this.numberOfDaysAKeypairShouldRemainInKeyStoreAfterRegenratingKeyPairInDays));
    }
    private deleteRedundantKeys(): void
    {
        for (let i = 0; i < this.redundantKeysCount; i++)
        {
            const keyToBeDeleted = Array.from(this.keyStore.keys())[ 0 ];

            this.deleteKey(keyToBeDeleted);
        }
    }
    private writeKeys(keysId: string, keyPair: string): void
    {
        try
        {
            fs.writeFileSync(process.cwd() + `/keys/${ keysId }.json`, keyPair);
        } catch (error)
        {
            throw new InternalServerErrorException(
                "Error while writing files into FS @JWKeyStore.writeKeys()",
            );
        }
    }
    private revokeRedundantKeys(): void
    {
        if (this.areThereAnyRedundantKeys())
        {
            this.deleteRedundantKeys();
        }
    }

    private get areThereAnyKeys(): boolean
    {
        return (this.keysLength > 0) ? true : false;
    }
}
