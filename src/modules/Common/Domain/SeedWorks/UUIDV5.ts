import * as crypto from "crypto";
import Result from "src/modules/Common/Application/Result";
import ValueObject from "src/modules/Common/Domain/SeedWorks/ValueObject";

export default class UUIDV5 extends ValueObject<string>
{
    private static _UUIDV5_VALIDATOR = /^[0-9A-F]{8}-[0-9A-F]{4}-[5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

    private static _hash(version: number, hash: string): string
    {
        return `${ hash.substring(0, 8) }-${ hash.substring(8, 4) }-${ (version + hash.substring(13, 3)) }-${ ((parseInt(hash.substring(16, 2), 16) | 0x80) & 0xBF).toString(16) }${ hash.substr(18, 2) }-${ hash.substr(20, 12) }`;
    }
    public static createEmpty(): Result<UUIDV5>
    {
        return Result.ok(new UUIDV5({ value: "" }));
    }
    public static create(aNamespace: string, aName: string): Result<UUIDV5>
    {
        const hexNamespace = aNamespace.replace(/[{}\-]/g, '');
        const hexName = Buffer.from(aName, 'utf8').toString('hex');

        if (hexNamespace.length !== 32 || hexName.length % 2 !== 0)
        {
            throw new Error('Invalid hex string length');
        }
        const bytesNamespace = Buffer.from(hexNamespace, 'hex');
        const bytesName = Buffer.from(hexName, 'hex');

        const hash = crypto.createHash('sha1')
            .update(Buffer.concat([ bytesNamespace, bytesName ]))
            .digest('hex');

        return Result.ok(new UUIDV5({ value: UUIDV5._hash(5, hash) }));
    }
    public static fromValid(aUUIDV5: string): Result<UUIDV5>
    {
        return Result.ok(new UUIDV5({ value: aUUIDV5 }));
    }
    public static isValid(aUUIDV5: string): boolean
    {
        return new RegExp(UUIDV5._UUIDV5_VALIDATOR).test(aUUIDV5);
    }
}
