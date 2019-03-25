const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const directorSchema = new Schema({
    name:{
        type:String,
        required: true,
        maxlength: 15
    },
    surname: {
        type: String,
        required: true,
        maxlength: 15
    },
    bio : String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports =mongoose.model('directors',directorSchema);
