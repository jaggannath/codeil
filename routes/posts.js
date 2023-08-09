const express=require('express');
const route=express.Router();
const passport=require('passport');

const postcont=require('../controllers/postcontroller');
route.post('/create',passport.checkAuthentication,postcont.create);
route.get('/destroy/:id',passport.checkAuthentication,postcont.destroy);
module.exports=route;