const User=require('../../../models/user');
const jwt=require('jsonwebtoken');

module.exports.createsession =  async function (req, res) {
    try{
	let user= await User.findOne({email:req.body.email});
    if(!user || user.password!=req.body.password){
        return res.json(422,{
            message:"unautorides"
        });
    }
    return res.json(220,{
        message:"sign in successfully",
        data:{
            token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'100000'})
        }

    })
    }
    catch(err){
        return res.json(500,{
            message:"internal server error"
        })

    }
};