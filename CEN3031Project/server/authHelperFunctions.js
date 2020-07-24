// import {jsonwebtoken as jwt} from 'jsonwebtoken';
// var jwt = require('jsonwebtoken');
import * as jwt from 'jsonwebtoken';
import Student from './models/studentModel.js';

// import {secret as jwt_secret} from './config/config.js';
import config from './config/config.js'; //config.secret

const jwt_secret = process.env.secret || config.secret;
// const jwt = require('jsonwebtoken'),
//     User = require('./models/user.js'),
//     jwt_secret = process.env.secret || require('./config/config.js').secret;


// function to create tokens
export function signToken(user)
{
    const userData = user.toObject();
    delete userData.password;
    return jwt.sign(userData, jwt_secret)
}

// function to verify tokens
export function verifyToken(req, res, next)
{
    const token = req.get('token') || req.body.token || req.query.token;

    // reject user if no token
    if(!token) return res.json({success: false, message: "No token provided"});

    // try to verify token
    jwt.verify(token, jwt_secret, (err, decodedData) =>
    {
        // error check
        if(err) return res.json({success: false, message: "Error with token"});

        // find user associated with token
        User.findById(decodedData._id, (err, user) =>
        {
            // reject token if no user
            if(!user) return res.json({success: false, message: "Error with token"});

            req.user = user;
            next();
        })
    })
}

// module.exports = {
//     signToken,
//     verifyToken
// };