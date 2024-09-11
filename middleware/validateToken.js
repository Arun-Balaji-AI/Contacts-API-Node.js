const jwt = require("jsonwebtoken");
const error_handler = require("./errorHandler");

const validateToken = (req, res, next) => {
    try {
        let authHeader = req.headers.Authentication || req.headers.authentication;
        
        if (!authHeader || !(authHeader.startsWith("Bearer"))) {
            res.status(401);
            throw new Error("Unauthorized Access of user information");
        }

        let token = authHeader.split(" ")[1];
        
        if (!token) {
            res.status(401);
            throw new Error("User unauthorized");
        }
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(440);
                throw new Error("Login session has expired");
            }

            res.user = decoded.user;
            next();
        });
    }
    catch (err) {
        error_handler(err, req, res);
    }
}

module.exports = validateToken;