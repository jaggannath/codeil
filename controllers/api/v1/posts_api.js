
const Posts=require('../../../models/post');
const Comment=require('../../../models/comment');

module.exports.index= async function(req,res){
    const posts=await Posts.find({})
    .populate('user')
    .populate({
       path:'comments',
       populate:{
           path:'user'

       }

    });


    return res.json(200,{
        message:"list of post",
        post:posts

    })
}
module.exports.destroy=async function(req,res){
    try{
        let post=await Posts.findById(req.params.id);
        if(post.user==req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});
           
            return res.json(200,{
                message:"Post and associated comments deleted successfully!"
            });
        }
        else{
            return res.json(401,{
                message:"u can't delete this post!"
            });
        }
        }
    catch(err){

        
        return res.json(500,{
            message:'Internal Server Error'
        });
    }

}