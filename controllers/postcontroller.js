const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create=async function(req,res){
    try{
        
        let post=await Post.create({
       content:req.body.content,
       user:req.user._id

    });
    
    req.flash('success','post published');
       return res.redirect('back');
   }
   catch(err){
       if(err){
           console.log(err);
       }
      return res.redirect('back');
   }

    
        

};
module.exports.destroy=async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        if(post.user==req.user.id){
            
            
            //post.remove();
            await Post.deleteOne({_id: req.params.id});
            await Comment.deleteMany({post:req.params.id});
            
            req.flash('error','post deleted');
                
                return res.redirect('back');

        }
        else{
            
            return res.redirect('back');
        }
    }
    catch(err){
        if(err){
            console.log(err);
        }
        return res.redirect('back');
    }

}