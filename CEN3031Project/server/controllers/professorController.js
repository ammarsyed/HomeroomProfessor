import Professor from '../models/professorModel.js';

import bcrypt from "bcryptjs";


export const create = async (req, res) =>
{

    var professor = new Professor(req.body);
    professor.fullName = professor.firstName + " " + professor.lastName;

    bcrypt.genSalt(10, (err, salt) =>
    {
        // hash is the password
        bcrypt.hash(professor.hash, salt, (err, hash) =>
        {
            if(err) throw err;
            professor.hash = hash;

            professor.save(function (err, result)
            {
                if(err)
                {
                    res.send(err);
                }
                else
                {
                    res.send({'success': true, 'message': 'Professor retrieved for save', result});
                }
            });
        })
    })


};

export const checkLogin = (req, res) =>
{

    const blank = {};
    var query = Professor.find(blank);

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


export const professorList = (req, res) =>
{
    var query = Professor.find({});
    query.exec(function (err, allProfessors)
    {
        if(err)
        {
            res.status(404).send(err);
        }
        else
        {

            let arr = [];

            for(let i in allProfessors)
            {
                arr.push(allProfessors[i]);
            }

            // arr[0], arr[1], to access each professor
            // console.log(arr[0]);
            // console.log(arr[0]);
            // console.log(arr[1].fullName);
            // console.log(arr[1].subjects.computerscience);

            console.log(allProfessors[1].fullName);
            console.log(allProfessors[1].subjects.computerscience);

            res.json(allProfessors);
        }
    });

}