/*
This file is responsible for errorhandling during routing
*/ 

const constants = {
    VALIDATION_ERROR: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SESSION_EXPIRED : 440,
    SERVER_ERROR : 500
}

const errorHandler = (err, req, res) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:{
            res.json({
                title: "Validation Error",
                message: err.message,
                stactTrace: err.stack
            });
            break;
        }
        case constants.UNAUTHORIZED:{
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        }
        case constants.FORBIDDEN:{
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        }
        case constants.NOT_FOUND:{
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        }
        case constants.SERVER_ERROR:{
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        }
        case constants.SESSION_EXPIRED: {
            res.json({
                title: "Session Expired",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        }
        default:
            break;
    }

    
}

module.exports = errorHandler;