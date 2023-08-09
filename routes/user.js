const express=require('express');
const route=express.Router();
const passport=require('passport');
const usercont=require('../controllers/usercontroller')
route.get('/profile/:id',passport.checkAuthentication,usercont.profile);
route.post('/update/:id', passport.checkAuthentication, usercont.update);
route.get('/sign-in',usercont.usersignin);
route.get('/sign-up',usercont.usersignup);
route.post('/create',usercont.create);
route.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
)
,usercont.createsession);
route.get('/sign-out',usercont.destroySession);

module.exports=route;