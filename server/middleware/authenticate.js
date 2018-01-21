var {User}=require('./../models/user');

var authenticate=(req,res,next)=>{
    var token=req.header('x-auth');
    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        // res.send(user);
        req.user=user;
        req.token=token;
        next();
    }).catch((e)=>{
        res.status(403).send("User is not authorized");
    });
};

module.exports={authenticate};