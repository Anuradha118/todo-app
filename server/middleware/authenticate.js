var {User}=require('./../models/user');

var authenticate=(req,res,next)=>{
    var token=req.header('x-auth');
    User.findByToken(token).then((user)=>{
        if(!user){
        // console.log("User is not authorized");            
            return Promise.reject();
        }
        // res.send(user);
        req.user=user;
        req.token=token;
        next();
    }).catch((e)=>{
        // console.log("User is not authorized");
        res.status(403).send("User is not authorized");
    });
};

module.exports={authenticate};