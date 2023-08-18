const jwt=require('jsonwebtoken')
const JWT_SECRET='Devashishisagoodbo$y'

const fetchuser=async(req,res,next)=>{
// Get the user from the jwt web token and add id to req object
const token=req.header('auth-token');
if(!token)
{
    res.status(401).send({error:'Please Authenticate using a valid token'})
}

try{
    const data=jwt.verify(token,JWT_SECRET)
    req.user=data.user;
    next();
}
catch(err){
    res.status(401).send({error:'Please Authenticate using a valid token'})
}
}

module.exports=fetchuser;