require('./../config/config');

var mongoose=require('mongoose');


mongoose.Promise=global.Promise;
// console.log('Monggose File',process.env.MONGODB_URI);
// mongoose.connect('mongodb://anuradha:todo@ds163836.mlab.com:63836/todoapp');
// mongoose.connect('mongodb://localhost:27017/TodoApp');
mongoose.connect(process.env.MONGODB_URI);

module.exports={mongoose};