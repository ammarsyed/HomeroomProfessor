var Student = require('../models/studentModel.js');
var signToken = require('../authHelperFunctions').signToken;

const create = async (req, res) =>
{
    console.log("reached create function")
    console.log(req.body);
    var student = new Student(req.body);

    student.fullName = student.firstName + " " + student.lastName;

    console.log(student);

    const token = await signToken(student); //not sure if i need await

    console.log('get token')
    console.log(token);

    student.save(function (err, result)
    {
        console.log('in save function')
        if(err)
        {
            console.log('error')

            res.json({success: false, code: err.code});
        }
        else
        {
            console.log('save else')

            res.json({success: true, message: "User created with token", token});
        }
    });
};


const checkLogin = (req, res) =>
{

    const blank = {};
    var query = Student.find(blank);

    query.exec(function (err, all) {
        if (err) {
            res.status(404).send(err);
        }
        else {
            res.json(all);
        }
    });

};

const getAllStudents = async (req, res) =>
{
    try
    {
        const users = await Student.find({});
        res.json(users);
    }
    catch(err)
    {
        res.status(400).send(err);
    }

};


const getOneStudent = async (req, res) =>
{
    try
    {
        const users = await Student.findbyId(req.params.id);
        res.json(users);
    }
    catch(err)
    {
        res.status(400).send(err);
    }

};


// update a student user

const updateOneStudent = async (req, res) =>
{
    try
    {
        const user = await Student.findById(req.params.id);
        Object.assign(user, req.body);
        await user.save();

        res.json({success: true, message: "User updated", user});
    } catch(err)
    {
        res.json({success: false, code: err.code});
    }

}

// delete a student
const deleteOneStudent = async (req, res) =>
{
    try
    {
        const user = await Student.findByIdAndRemove(req.params.id);
        res.json({success: true, message: "User deleted", user});
    } catch(err)
    {
        res.json({success: false, code: err.code});
    }

}


// Authenticate

const authenticateStudent = async (req, res) =>
{
    const user = await Student.findOne({username: req.body.username}); //changed from email to username

    if(!user || !user.validPassword(req.body.password))
    {
        return res.json({success: false, message: "Invalid Login"});
    }

    const token = await signToken(user);
    res.json({success: true, message: "Token attached", token});

}

module.exports.create = create;
module.exports.checkLogin = checkLogin;
module.exports.getOneStudent = getOneStudent;
module.exports.updateOneStudent = updateOneStudent;
module.exports.deleteOneStudent = deleteOneStudent;
module.exports.authenticateStudent = authenticateStudent;
module.exports.getAllStudents = getAllStudents;