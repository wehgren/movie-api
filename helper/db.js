const mongoose = require('mongoose');
//burada admin user bilgisi girilir
module.exports = () =>{
    mongoose.connect('mongodb+srv://admin-user:abcd1234@cluster0-qacxa.mongodb.net/test?retryWrites=true');
    mongoose.connection.on('open',() =>{
        console.log('MongoDB: connected');
    });
    mongoose.connection.on('error',(err) =>{
        console.log('MongoDB: Failed to connect',err);
    });
    mongoose.Promise = global.Promise;
};

