"use strict"

const { verifyToken } = require('../helper/jwt');
const { User } = require('../models');

async function authentication(req, res, next) {
    try {
        const bearerToken = req.headers.authorization;

        if(!bearerToken) {
            throw {name : "Invalid Token"};
        };

        const token = bearerToken.split(' ')[1];
        const decoded = verifyToken(token);

        const user = await User.findByPk(decoded.id);

        if (!user) {
            throw {name : "Invalid Token"};
        };

        req.user = user;

        next();
    } catch (error) {
        next(error);   
    }
};

module.exports = authentication;