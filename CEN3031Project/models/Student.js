const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
//    TO DO

});

module.exports = Student = mongoose.model('student', StudentSchema);

