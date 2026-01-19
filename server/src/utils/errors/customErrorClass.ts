

export class CustomError extends Error {
    constructor(public statusCode: number, public message: string, public code: string){
        super(message);
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message: string, code: string){
        super(401, message, code);
    }
}
export class ValidationError extends CustomError {
    constructor(message: string, code: string){
        super(400, message, code);
    }
}
export class ConflictError extends CustomError {
    constructor(message: string, code: string){
        super(409, message, code);
    }
}
export class NotFoundError extends CustomError {
    constructor(message: string, code: string){
        super(404, message, code);
    }
}

export class ForbiddenError extends CustomError {
    constructor(message: string, code: string){
        super(403, message, code);
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string, code: string){
        super(400, message, code);
    }
}