import Student from '../models/studentModel.js';

export const create = async (req, res) => {

    var student = new Student(req.body);
    
    student.save(function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send({ 'success': true, 'message': 'Student retrieved for save', result });
        }
    });
};

export const checkLogin = (req, res) => {

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