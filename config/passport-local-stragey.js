const passport=require('passport');
const Localstrategy=require('passport-local').Strategy;
const User=require('../models/user');

passport.use(new Localstrategy({
    usernameField:'email',
    passReqToCallback:true
},
async function(req,email,password,done){
    try{
    const user= await User.findOne({email,email});
        
        if(!user || user.password!=password){
            req.flash('error','invalid username/password')
            console.log('invalid username/password');
            return done(null,false);
        }
        return done(null,user);
    }
    catch{
        
            console.log('error in finding user');
            return done(err);
        
    }

    

}
));

passport.serializeUser(function(user,done){
    done(null,user);
});




passport.deserializeUser(async function(id,done){
    try{
    const user= await User.findById(id)
        
        return done(null,user);
    }
    catch{
        
            console.log('error in finding user');
            return done(err);
        
    }

    

});
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();

    }
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;

    }

    next();
}
module.exports=passport;