const jwt = require("jsonwebtoken");
const errorHandler = require("./errorHandler");

const validateToken = (req, res, next) => {
   try {
       let authHeader = req.headers.Authorization || req.headers.authorization;
       
        if (authHeader && authHeader.startsWith("Bearer")) {
            let token = authHeader.split(" ")[1];

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    res.status(401);
                    throw new Error("Unauthorized Access");
                }

                req.user = decoded.user;
                next();
            });
            if (!token) {
                res.status(401);
                throw new Error("Unauthorized Access");
            }
       }
        else {
            res.status(401);
            throw new Error("Access Denied");
       }
       
    }
   catch (err) {
       errorHandler(err, req, res);
    }
}


module.exports = validateToken;