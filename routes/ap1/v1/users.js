const express =require('express');
const route=express.Router();
const userApi=require('../../../controllers/api/v1/user_api');
route.post('/create-session',userApi.createsession);






module.exports=route;