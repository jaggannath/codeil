const express =require('express');
const route=express.Router();
console.log("hi");
const homecont=require('../controllers/homecontroller');
route.get('/',homecont.home);
route.use('/users',require('./user'));
route.use('/posts',require('./posts'));
route.use('/comments',require('./comments'));
route.use('/ap1',require('./ap1'));

module.exports=route;
