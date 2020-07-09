const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfessorSchema = new Schema({
    name:{
        type:String,
        required:true
    },
//    TO DO

});

module.exports = Professor = mongoose.model('professor', ProfessorSchema);

