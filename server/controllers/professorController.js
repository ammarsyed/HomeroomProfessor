
var Professor = require('../models/professorModel')
var signToken = require('../authHelperFunctions').signToken;

const create = async (req, res) =>
{

    var professor = new Professor(req.body);
    professor.fullName = professor.firstName + " " + professor.lastName;



    const token = await signToken(professor); //not sure if i need await



    professor.save(function (err, result)
    {

        if(err)
        {


            res.json({success: false, code: err.code});
        }
        else
        {


            res.json({success: true, message: "User created with token", token});
        }
    });
};

const checkLogin = (req, res) =>
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

const addStudentToProfessor = async (req, res) =>
{
    console.log("REACHED STUDENT TO PROFESSOR FUNCTION IN CONTROLLER")
    console.log(req.body);
    //console.log(req.body);
    //console.log(req.params.id)
    console.log('done printing out req');
    var query = await Professor.findOneAndUpdate(
        //console.log(req);
        //console.log(req.body);
        //console.log(req.params.id);
        {"_id": req.body.id},
        {
            // "salt": "sup"
            $push: {
                students: {
                    studentFirstName: req.body.firstName,
                    studentLastName: req.body.lastName,
                    request: true,
                    approved: false
                }
            }
        }

    );
    console.log('right after find and update')
    query.exec(function (err, result)
    {
        if(err)
        {
            res.status(404).send(err);
        }
        else
        {
            console.log(result)
        }
    });
};


const getAllProfessors = async (req, res) =>
{
    try
    {
        const users = await Professor.find({});
        res.json(users);
    }
    catch(err)
    {
        res.status(400).send(err);
    }

};


const getOneProfessor = async (req, res) =>
{
    try
    {
        const users = await Professor.findbyId(req.params.id);
        res.json(users);
    }
    catch(err)
    {
        res.status(400).send(err);
    }

};


// update a professor user

const updateOneProfessor = async (req, res) =>
{
    try
    {
        const user = await Professor.findById(req.params.id);
        Object.assign(user, req.body);
        await user.save();

        res.json({success: true, message: "User updated", user});
    } catch(err)
    {
        res.json({success: false, code: err.code});
    }

}

// delete a professor
const deleteOneProfessor = async (req, res) =>
{
    try
    {
        const user = await Professor.findByIdAndRemove(req.params.id);
        res.json({success: true, message: "User deleted", user});
    } catch(err)
    {
        res.json({success: false, code: err.code});
    }

}

// Authenticate

const authenticateProfessor = async (req, res) =>
{
    const user = await Professor.findOne({username: req.body.username}); //changed from email to username

    if(!user || !user.validPassword(req.body.password))
    {
        return res.json({success: false, message: "Invalid Login"});
    }

    const token = await signToken(user);
    res.json({success: true, message: "Token attached", token});

}

module.exports.create = create;
module.exports.addStudentToProfessor = addStudentToProfessor;
module.exports.checkLogin = checkLogin;
module.exports.getOneProfessor = getOneProfessor;
module.exports.updateOneProfessor = updateOneProfessor;
module.exports.deleteOneProfessor = deleteOneProfessor;
module.exports.authenticateProfessor = authenticateProfessor;
module.exports.getAllProfessors = getAllProfessors;
