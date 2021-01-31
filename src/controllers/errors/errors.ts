export enum HttpMessage {
    OK = 'Successful request',
    CREATED = 'The request was successful and a new resource was created.',
    BAD_REQUEST = 'Malformed data or invalid syntax.',
    UNAUTHORIZED = 'Not authenticated. You must be authenticated to receive the funds.',
    FORBINDDEN = 'You do not have the necessary permission to access the resources.',
    NOT_FOUND = 'The server cannot find the requested resource.',
    INTERNAL_SERVER_ERROR = 'Internal server error.'
}

export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBINDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}