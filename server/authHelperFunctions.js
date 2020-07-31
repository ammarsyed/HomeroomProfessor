var jwt = require('jsonwebtoken');
var Student = require('./models/studentModel.js')
// var config = require('./config/config.js')

var Professor = require('./models/professorModel.js')

const jwt_secret = process.env.secret || require('./config/config.js').secret;
// const jwt = require('jsonwebtoken'),
//     User = require('./models/user.js'),
//     jwt_secret = process.env.secret || require('./config/config.js').secret;


// function to create tokens
function signToken(user)
{

    console.log("in sign token function")
    console.log(user);
    const userData = user.toObject();
    console.log(userData)
    delete userData.password;
    console.log('after deleting password')
    console.log(userData)
    console.log(jwt_secret)
    return jwt.sign(userData, jwt_secret)
}

// function to verify tokens
function verifyToken(req, res, next)
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
        Student.findById(decodedData._id, (err, user) =>
        {
            // reject token if no user
            // if(!user) return res.json({success: false, message: "Error with token"}); commented this out
            if(user)
            {
                req.user = user;
                next();
            }
        })
        //added
        Professor.findById(decodedData._id, (err, user) =>
        {
            // reject token if no user
            if(!user) return res.json({success: false, message: "Error with token"});

            req.user = user;
            next();
        })
    })
}

module.exports = {
    signToken,
    verifyToken
};