
module.exports = (req,res,next)=>{
    if(req.user.isAdmin==1){
        next();
    }
    else{
        return res.status(401).json({error : "only admin has a access"});
    } 
}