const nodeMailer=require('../config/nodemailer');
exports.newComment=(comment)=>{
    console.log('inside new comment mailer');
    nodeMailer.transporter.sendMail({
        from:'saketmmfd1410@gmail.com',
        to:comment.user.email,
        subject:"new comment published!",
        html:'<h2> comment published</h2> '
    },(err,info)=>{
        if(err){
            console.log('error');
            return;
        }
        console.log('message sent');
        return;


    });
}