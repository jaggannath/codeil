const User=require('../models/user')
module.exports.profile=async function(req,res){
	try{
	const user=await User.findById(req.params.id);
    return res.render('userprofile',{
		title:"profile",
		profile_user:user
	});
}
catch(err){
	if(err){
		console.log(err);
	}
	return res.redirect('/');
}
	
}
module.exports.update = async function(req, res){
	try{
    if(req.user.id == req.params.id){
        const user= await User.findByIdAndUpdate(req.params.id);
		User.uploadedAvatar(req,res,function(err){
			if(err){
				console.log(err);
			}
			user.name=req.body.name;
			user.email=req.body.email;
			if(req.file){
				user.avatar=User.avatarPath+'/'+req.file.filename;
			}
			user.save();
			return res.redirect('back');
		})
           
        
    }else{
        return res.status(401).send('Unauthorized');
    }
}
catch (error) {
	console.log(error);
	return res.redirect('back');
}
}

module.exports.usersignin=function(req,res){
	if(req.isAuthenticated()){
		return res.redirect('/users/profile');
	}
    return res.render('sign-in',{
        title:"sign-in"
    });
}
module.exports.usersignup=function(req,res){
	if(req.isAuthenticated()){
		return res.redirect('/users/profile');
	}
    return res.render('sign-up',{
        title:"sign-up"
    });
}
module.exports.create = async function (req, res) {
	try {
		//sign up page
		// 1. Check if password and confirmPassword are equal
		if (req.body.password != req.body.confirm_password) {
			return res.redirect('back');
		}

		// 2. Check if the user already exists
		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			// 3. Create the user
			const createdUser = await User.create(req.body);
			return res.redirect('/users/sign-in');
		} else {
			return res.redirect('back');
		}
	} catch (error) {
		console.log(error);
		return res.redirect('back');
	}
};
module.exports.createsession =  function (req, res) {
	req.flash('success','logged in successfully');
	res.redirect('/');

};
module.exports.destroySession = function(req, res,next){
//req.flash('success','you have logged out');
	req.logout(function(err) {
		if (err) { return next(err); }
		req.flash('success','you have logged out');
		res.redirect('/');
	  });

    
}
