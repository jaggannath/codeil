const express=require('express');
const route=express.Router();
const passport=require('passport');

const commentcont=require('../controllers/commentcontroller');
route.post('/create',passport.checkAuthentication,commentcont.create);
route.get('/destroy/:id',passport.checkAuthentication,commentcont.destroy)
module.exports=route;