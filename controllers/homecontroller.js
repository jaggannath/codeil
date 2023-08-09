const Posts=require('../models/post');
const User=require('../models/user');
module.exports.home=  async function(req,res){
    try{
         const posts=await Posts.find({})
         .populate('user')
         .populate({
            path:'comments',
            populate:{
                path:'user'

            }

         });
         const user= await User.find({});
         console.log(user);

         
        
            return  res.render('home',{
                title:"home",
                posts:posts,
                all_users:user

            })
        }
        catch(err){
            if(err){
                console.log(err);
            }
            return res.redirect('back');
        }
        };
       
    
   

    
