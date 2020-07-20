import Professor from '../models/professorModel.js';

export const create = async (req, res) =>
{

    var professor = new Professor(req.body);
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