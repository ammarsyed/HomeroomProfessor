import Student from '../models/studentModel.js';
import {signToken} from '../authHelperFunctions.js';

export const create = async (req, res) =>
{

    var student = new Student(req.body);

    student.fullName = student.firstName + " " + student.lastName;

    const token = await signToken(student); //not sure if i need await

    student.save(function (err, result)
    {
        if(err)
        {
            // res.send(err);
            res.json({success: false, code: err.code});
        }
        else
        {
            // res.send({'success': true, 'message': 'Student retrieved for save', result});
            res.json({success: true, message: "User created with token", token});
        }
    });
};

export const checkLogin = (req, res) =>
{

    const blank = {};
    var query = Student.find(blank);

    query.exec(function (err, all)
    {
        if(err)
        {
            res.status(404).send(err);
        }
        else
        {
            res.json(all);
        }
    });

};


export const getAllStudents = async (req, res) =>
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


export const getOneStudent = async (req, res) =>
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

export const updateOneStudent = async (req, res) =>
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
export const deleteOneStudent = async (req, res) =>
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

export const authenticateStudent = async (req, res) =>
{
    const user = await Student.findOne({email: req.body.email});

    if(!user || !user.validPassword(req.body.password))
    {
        return res.json({success: false, message: "Invalid Login"});
    }

    const token = await signToken(user);
    res.json({success: true, message: "Token attached", token});

}