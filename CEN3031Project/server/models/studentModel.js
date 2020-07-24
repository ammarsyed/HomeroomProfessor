import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from 'bcryptjs';

//const bcrypt = require(bcrypt);
//const SALT_WORK_FACTOR = 10;

// const uniqueValidator = require('mongoose-unique-validator');
// const jwt = require('jsonwebtoken');
// const secret = require('../config').secret;

const StudentSchema = new Schema({
    firstName: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z]+$/, 'is invalid'], index: true},
    lastName: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z]+$/, 'is invalid'], index: true},
    fullName: {type: String},
    username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},

    // Passwords
    password: {type: String}, //changed from hash to password
    salt: {type: String},

    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    age: {type: Number, min: 0, max: 100, required: true},
    phoneNumber: {type: String, minlength: 10, maxlength: 11, required: true},
    grade: {type: Number, min: 0, max: 12, required: true},
    city: {type: String, uppercase: true, required: true},
    state: {type: String, uppercase: true, required: true},
    subjects: {
        computerscience: {type: Boolean, default: false},
        english: {type: Boolean, default: false},
        spanish: {type: Boolean, default: false},
        french: {type: Boolean, default: false},
        latin: {type: Boolean, default: false},
        algebra: {type: Boolean, default: false},
        geometry: {type: Boolean, default: false},
        precalculus: {type: Boolean, default: false},
        statistics: {type: Boolean, default: false},
        calculus: {type: Boolean, default: false},
        biology: {type: Boolean, default: false},
        chemistry: {type: Boolean, default: false},
        physics: {type: Boolean, default: false},
        healthscience: {type: Boolean, default: false},
        environmentalscience: {type: Boolean, default: false},
        earthscience: {type: Boolean, default: false},
        history: {type: Boolean, default: false},
        economics: {type: Boolean, default: false},
        psychology: {type: Boolean, default: false},
        government: {type: Boolean, default: false},
        geography: {type: Boolean, default: false}
    }
});


// adds method to user to create hashed password
StudentSchema.methods.generateHash = function (password)
{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// adds method to user to check if password is correct
StudentSchema.methods.validPassword = function (password)
{
    return bcrypt.compareSync(password, this.password);
};

// had to add this, checks if password was changed before saving
StudentSchema.pre('save', function (next)
{
    if(this.isModified('password'))
    {
        this.password = this.generateHash(this.password);
    }
    next();
});

// const User = mongoose.model('user', userSchema);
// module.exports = User;

export default mongoose.model('Student', StudentSchema);



















// bcrypt functions asynchronous, synchronous versions available if needed
//StudentSchema.methods.setPassword = function(password) {

//    // Uses bcrypt to generate salt and hash, generally accepted as the preferred method for passwords
//    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
//        if (err) return next(err);

//        // Save salt for authentication
//        this.salt = salt;

//        // Uses password passed in to function and salt to generate hash
//        bcrypt.hash(password, salt, function (err, hash) {
//            if (err) return next(err);

//            this.hash = hash;

//            // Not sure if next needed, depends on how this is called I think
//            //next();
//        });
//    });
//};

//StudentSchema.methods.validatePassword = function (password) {

//    // Takes in password to compare, compares with hashed password
//    bcrypt.compare(password, this.hash, function (err, result) {
//        if (err) return next(err);

//        // result = true if passwords match, false otherwise
//        return result
//    });
//};

// Methods for creating and using JSON web token for authentication
//StudentSchema.methods.createJWT = function () {

//    var today = new Date();
//    var expires = new Date(today);
//    expires.setDate(today.getDate() + 30);

//    return jwt.sign({
//        id = this._id,
//        username = this.username,
//        expires: parseInt(expires.getTime() / 1000),
//    }, secret);
//};

//StudentSchema.methods.sendAuthJSON = function () {
//    return {
//        username: this.username,
//        email: this.email,
//        token: this.createJWT()
//    };
//};

// Plugin for validating unique fields
// StudentSchema.plugin(uniqueValidator, {message: 'is already taken.'});

