module.exports = function errorHandler(error, req, res, next) {
    console.log("-----", error);
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({message : error.errors[0].message});
    } else if (error.name === "Invalid Input") {
        res.status(400).json({message : "Email and Password is Required"});
    } else if (error.name === "Input Not Allowed") {
        res.status(400).json({message : "Input Not Allowed"})
    } else if (error.name === "Invalid User") {
        res.status(401).json({message: "Invalid Email or Password"})
    } else if (error.name === "Invalid Token") {
        res.status(401).json({message : error.name});
    } else if (error.name === "JsonWebTokenError") {
        res.status(401).json({message : error.name});
    } else if (error.name === "Unauthorized") {
        res.status(403).json({message : "Unauthorized Access"});
    } else if (error.name === "Not Found") {
        res.status(404).json({message : "Data Not Found"})
    } else {
        res.status(500).json({message : "Internal Server Error"});
    }
}