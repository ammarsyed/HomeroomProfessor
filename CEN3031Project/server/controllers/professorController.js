import Professor from '../models/professorModel.js';


export const create = async (req, res) => {

    var professor = new Professor(req.body);

    professor.save(function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send({ 'success': true, 'message': 'Professor retrieved for save', result });
        }
    });
};