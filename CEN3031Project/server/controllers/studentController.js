import Student from '../models/studentModel.js';

import bcrypt from "bcryptjs";


export const create = async (req, res) =>
{

    var student = new Student(req.body);

    student.fullName = student.firstName + " " + student.lastName;

    bcrypt.genSalt(10, (err, salt) =>
    {
        // hash is the password
        bcrypt.hash(student.hash, salt, (err, hash) =>
        {
            if(err) throw err;
            student.hash = hash;
            console.log(student.hash);
            console.log(hash);
            student.save(function (err, result)
            {
                if(err)
                {
                    res.send(err);
                }
                else
                {
                    res.send({'success': true, 'message': 'Student retrieved for save', result});
                }
            });
        })
    })
    console.log(student.hash);
    // not sure if this should go inside the hashing function or not

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