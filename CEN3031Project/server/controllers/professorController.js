import Professor from '../models/professorModel.js';

export const create = async (req, res) =>
{

    var professor = new Professor(req.body);
    
    res.send(professor);
    
    professor.fullName = professor.firstName + " " + professor.lastName;

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

export const addStudentToProfessor = (req, res) => {

    var query = Professor.findOneAndUpdate(
        { "_id": req.params.id },
        {
            $push: {
                students: {
                    studentFirstName: req.firstName,
                    studentLastName: req.lastName
                }
            }
        });

    query.exec(function (err, result) {
        if (err) {
            res.status(404).send(err);
        }
        else {
            console.log(result)
        }
    });
};