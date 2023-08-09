const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1/codeil');
const db=mongoose.connection;
db.on('error',console.error.bind(console,"error handling"));
db.once('open',function(){
    console.log('connected to database::mongodb');
});
module.exports=db;
