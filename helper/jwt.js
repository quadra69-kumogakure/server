"use strict"
const jwt = require('jsonwebtoken');
const secret = "rahasia";

const createToken = (payload) => {
    const token = jwt.sign(payload, secret);

    return token;
};

const verifyToken = (token) => {
    const payload  = jwt.verify(token, secret);

    return payload;
};

module.exports = {createToken, verifyToken};