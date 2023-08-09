const express =require('express');
const cookieparser=require('cookie-parser');
 const app=express();
 const port=8000;
 const expresslayout=require('express-ejs-layouts');
 const db=require('./config/mongoose');
 const session=require('express-session');
 const passport=require('passport');
 
 const passportlocal=require('./config/passport-local-stragey');
 const passportJWT = require('./config/passport-jwt-strategy');
 const MongoStore=require('connect-mongo')(session);
 const flash=require('connect-flash');
 const customMware=require('./config/middleware');
 app.use(express.urlencoded());
 app.use(cookieparser());
 app.use(express.static('./assests'));
 app.use('/uploads',express.static(__dirname + '/uploads'));
 app.use(expresslayout);


 
 app.set('view engine','ejs');
 app.set('views','./views');
 app.use(session({
    name:'codeil',
    secret:'blahsomething',
    saveUninitialize:false,
    resave:false,
    cookie:{
        maxage:(1000*60*100)
    },
    store:new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err);
        }
    )

    
 }));
 app.use(passport.initialize());
 app.use(passport.session());
 app.use(passport.setAuthenticatedUser);
 app.use(flash());
 app.use(customMware.setFlash);
 app.use('/',require('./routes'));

 app.listen(port,function(err){
    if(err){
        console.log(`err in running:{err}`);
    }
    console.log(`server is running on port:${port}`);
 })