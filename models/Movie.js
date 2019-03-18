const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    category:{
        type: String
    },
    country:{
        type: String
    },
    imbd_score:{
        type: Number
    },
    director_id: Schema.Types.ObjectId,
    createdAt:{
        type: Date,
        default: Date.now
    },
    year:Number
});
module.exports =mongoose.model('movie',MovieSchema);
