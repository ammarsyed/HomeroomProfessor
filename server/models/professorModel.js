var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');


const ProfessorSchema = new Schema({
    firstName: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z]+$/, 'is invalid'], index: true},
    lastName: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z]+$/, 'is invalid'], index: true},
    fullName: {type: String},
    username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    userType: {type: String, default: "professor"},
    // Passwords
    password: {type: String}, //changed from hash to password
    salt: {type: String},

    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    phoneNumber: {type: String, minlength: 10, maxlength: 11, required: true}, //handle this validation in HTML form using pattern attribute of input type tel tag
    university: {type: String, uppercase: true, required: true},
    department: {type: String, uppercase: true, required: true},
    city: {type: String, uppercase: true, required: true},
    state: {type: String, uppercase: true, required: true},
    subjectString: {type: String},
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
    },
    students: [ {
        studentFirstName: {type: String},
        studentLastName: {type: String},
        request: {type: Boolean },
        approved: { type: Boolean },
        date: { type: String }
    } ]
});

// adds method to user to create hashed password
ProfessorSchema.methods.generateHash = function (password)
{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// adds method to user to check if password is correct
ProfessorSchema.methods.validPassword = function (password)
{
    return bcrypt.compareSync(password, this.password);
};

// had to add this, checks if password was changed before saving
ProfessorSchema.pre('save', function (next)
{
    if(this.isModified('password'))
    {
        this.password = this.generateHash(this.password);
    }
    next();
});


const Professor = mongoose.model('Professor', ProfessorSchema);
module.exports = Professor;