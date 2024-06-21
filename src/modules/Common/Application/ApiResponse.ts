export default class ApiResponse
{
    private constructor (statusCode: number, message: string, data: object = {}, headers: object = {})
    {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.headers = headers;
    }
    private _statusCode: number;
    private _message: string;
    private _headers: object;
    private _data: object;

    public get headers(): object
    {
        return this._headers;
    }
    public set headers(headers: object)
    {
        this._headers = headers;
    }
    public get data(): object
    {
        return this._data;
    }
    public set data(data: object)
    {
        this._data = data;
    }
    public get message(): string
    {
        return this._message;
    }
    public set message(message: string)
    {
        this._message = message;
    }
    public get statusCode(): number
    {
        return this._statusCode;
    }
    public set statusCode(statusCode: number)
    {
        this._statusCode = statusCode;
    }
    public static informational(statusCode: number, message: string): ApiResponse
    {
        return new ApiResponse(statusCode, message);
    }
    public static success(statusCode: number, message: string, data: object): ApiResponse
    {
        return new ApiResponse(statusCode, message, data);
    }
    public static redirection(statusCode: number, message: string, location: string): ApiResponse
    {
        return new ApiResponse(statusCode, message, null, { Location: location });
    }
    public static clientError(statusCode: number, message: string): ApiResponse
    {
        return new ApiResponse(statusCode, message);
    }
    public static serverError(statusCode: number, message: string): ApiResponse
    {
        return new ApiResponse(statusCode, message);
    }
    public static continue(): ApiResponse
    {
        return ApiResponse.informational(100, 'Continue');
    }
    public static switchingProtocols(): ApiResponse
    {
        return ApiResponse.informational(101, 'Switching Protocols');
    }
    public static ok(data: object = {}): ApiResponse
    {
        return ApiResponse.success(200, 'OK', data);
    }
    public static created(data: object): ApiResponse
    {
        return ApiResponse.success(201, 'Created', data);
    }
    public static accepted(data: object): ApiResponse
    {
        return ApiResponse.success(202, 'Accepted', data);
    }
    public static multipleChoices(location: string): ApiResponse
    {
        return ApiResponse.redirection(300, 'Multiple Choices', location);
    }
    public static movedPermanently(location: string): ApiResponse
    {
        return ApiResponse.redirection(301, 'Moved Permanently', location);
    }
    public static badRequest(message: string = 'Bad Request'): ApiResponse
    {
        return ApiResponse.clientError(400, message);
    }
    public static unauthorized(message: string = 'Unauthorized'): ApiResponse
    {
        return ApiResponse.clientError(401, message);
    }
    public static internalServerError(message: string = 'Internal Server Error'): ApiResponse
    {
        return ApiResponse.serverError(500, message);
    }
    public static eTag(data: object, weak = false): ApiResponse
    {
        const eTagValue = `"${ weak ? 'W/' : '' }${ data.toString() }${ Math.random().toString(36).substring(7) }"`;
        return new ApiResponse(200, 'OK', data, { ETag: eTagValue });
    }
    public static cacheControl(maxAge = 3600, publicCache = true): ApiResponse
    {
        const cacheControlValue = `max-age=${ maxAge }${ publicCache ? ', public' : '' }`;
        return new ApiResponse(200, 'OK', null, { 'Cache-Control': cacheControlValue });
    }
    public toJSON(): Object
    {
        return {
            statusCode: this.statusCode,
            message: this.message,
            data: this.data
        };
    }
}
